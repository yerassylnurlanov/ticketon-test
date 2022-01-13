import React from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Svg,
  Rect,
  G,
  Text as SvgText
} from 'react-native-svg';
import { Props } from 'react-native-image-pan-zoom/built/image-zoom/image-zoom.type';

const AnimatedG = Animated.createAnimatedComponent(G);
const { height, width } = Dimensions.get('window');
const scale = 1;
const screen_width = width;


//
// const renderObject = (obj) => {
//   switch (obj.type) {
//     case false:
//       return (
//
//       );
//   }
// }

function calcDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function middle(p1, p2) {
  return (p1 + p2) / 2;
}

function calcCenter(x1, y1, x2, y2) {
  return {
    x: middle(x1, x2),
    y: middle(y1, y2)
  };
}


class SeatsSelectorAnimated extends React.Component {
  state = {
    pan: new Animated.ValueXY({ x: 0, y: 0 }),
    scale: new Animated.Value(1)
  };

  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderRelease: this.onPanResponderRelease
    });
  }

  onPanResponderGrant = (evt, gestureState) => {
    // this.isMoving = true;
  };

  onPanResponderMove = (evt, gestureState) => {
    const { touches } = evt.nativeEvent;
    const { length } = touches;

    if (length === 1) {
      const [{ pageX, pageY }] = touches;
      this.processTouch(pageX, pageY);
    } else {
      const [touch1, touch2] = touches;
      this.processPinch(
        touch1.pageX,
        touch1.pageY,
        touch2.pageX,
        touch2.pageY
      );
    }
  };

  processPinch = (x1, y1, x2, y2) => {
    const distance = calcDistance(x1, y1, x2, y2);
    const { centerX, centerY } = calcCenter(x1, y1, x2, y2);
    // const { height, width } = Dimensions.get('window');
//Как бы значение из rwnder() newWidth и newHeight вытащить и использовать здесь вместо width? Тогда и скакать на экрананх не будет.
    if (!this.isZooming) {
      this.isZooming = true;
      this.initialX = middle(x1, x2);
      this.initialY = middle(y1, y2);
      this.initialPanX = this.state.pan.x._value;
      this.initialPanY = this.state.pan.y._value;
      this.initialScale = this.state.scale._value;
      this.inititialDistance = distance;
    } else {
      const touchScale = distance / this.inititialDistance;
      const dx = middle(x1, x2) - this.initialX;
      const dy = middle(y1, y2) - this.initialY;

      r = this.initialScale * touchScale;
      if(r > 4) {
        r = 4;
      } else if(r < 0.25) {
        r = 0.25;
      }
      const newScale = r;
      const panX =  (middle(x1, x2) - this.initialX) + this.initialPanX;
      const panY =  (middle(y1, y2) - this.initialY)  + this.initialPanY;

      this.state.pan.setValue({
        x: panX,
        y: panY
      });
      this.state.scale.setValue(newScale);
    }
  };

  processTouch = (x, y) => {
    if (!this.isMoving || this.isZooming) {
      this.isMoving = true;
      this.isZooming = false;
      this.startX = x;
      this.startY = y;
      this.startPanX = this.state.pan.x._value;
      this.startPanY = this.state.pan.y._value;
    } else {
      const dx = (x - this.startX);
      const dy = (y - this.startY);
      this.state.pan.setValue({
        x: this.startPanX + dx,
        y: this.startPanY + dy
      });
    }
  };

  onPanResponderRelease = (evt, gestureState) => {
    this.isMoving = false;
    this.isZooming = false;
    // this.forceUpdate();
  };

  animateTo = (left, top, scale) => {
    Animated.parallel([
      Animated.timing(this.state.pan.x, {
        toValue: left,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.state.pan.y, {
        toValue: top,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scale, {
        toValue: scale,
        duration: 0,
        useNativeDriver: true
      })
    ]).start();

  };

  render() {
    const { show, selectedSeats, handleSeatClick } = this.props;
    const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];

    this.newWidth = scale * levels.width;
    this.newHeight = scale * levels.height;
    const viewBoxSize = width;
    const resolution = viewBoxSize / (Math.min(this.newHeight, this.newWidth)) * scale;
    const newScale = width / this.newWidth * scale;

    return (
      <View {...this.panResponder.panHandlers} style={{ width, height: width, overflow: 'hidden' }}>
        <Animated.View style={{
          transform: [
            {
              translateX: Animated.multiply(this.state.pan.x, resolution)
            },
            {
              translateY: Animated.multiply(this.state.pan.y, resolution)
            },
            {
              scale: this.state.scale
            }
          ]
        }}>
          <Svg
            width={this.newWidth * newScale}
            height={this.newHeight * newScale}
            viewBox={`0 0 ${this.newWidth * newScale} ${this.newHeight * newScale}`}
          >
            <AnimatedG>
              {levels.seats.map(seat => {
                return (
                <G key={seat.id}>
                  <Rect
                    x={newScale * parseInt(seat.x)}
                    y={newScale * parseInt(seat.y)}
                    width={newScale * parseInt(seat.w)}
                    height={newScale * parseInt(seat.h)}
                    onPress={() => {
                      handleSeatClick(seat.id, seat.row, seat.num, show.prices[seat.type].sum);
                    }}
                    fill={seat.busy === 0 ? '#05f000' : (selectedSeats[seat.id] !== undefined) ? '#f0e300' : '#8d888b'}
                  />
                  <SvgText
                    y={parseInt(seat.y) * newScale + (parseInt(seat.h) * newScale * 2 / 3)}
                    x={parseInt(seat.x) * newScale + (parseInt(seat.w) * newScale / 2)}
                    textAnchor="middle"
                    fontSize={parseInt(seat.h) * newScale * 2 / 3}
                    fill="black"
                  >
                    {seat.num}
                  </SvgText>
                </G>)
              }
              )}
              {levels.objects.map(obj => (
                <SvgText
                  key={obj.id}
                  x={parseInt(obj.x) * newScale}
                  y={parseInt(obj.y) * newScale + (parseInt(obj.h) * newScale * 2 / 3)}
                  fontSize={parseInt(obj.h - 2) * newScale}
                >
                  {obj.name}
                </SvgText>
              ))}

            </AnimatedG>
          </Svg>
        </Animated.View>
      </View>
    );
  }
}

export default SeatsSelectorAnimated;

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
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import SvgPanZoom from '../svg-pan-zoom';

const AnimatedG = Animated.createAnimatedComponent(G);
const scale = 4;
const { height, width } = Dimensions.get('window');
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


class SeatsSelectorAnimatedGestureHandler extends React.Component {
  state = {
    pan: new Animated.ValueXY({ x: 0, y: 0 }),
    scale: new Animated.Value(0.25)
  };

  constructor(props) {
    super(props);
    this.panRef = React.createRef();
    this.pinchRef = React.createRef();

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true }
    );

    /* Panning */
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }

  _onPanHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += Math.floor(event.nativeEvent.translationX / (this._lastScale * 1.5));
      this._lastOffset.y += Math.floor(event.nativeEvent.translationY / (this._lastScale * 1.5));
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };

  render() {
    const { show, selectedSeats, handleSeatClick } = this.props;
    const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];
    const newWidth = scale * levels.width;
    const newHeight = scale * levels.height;

    return (
      <View style={{ width, height: width, overflow: 'hidden' }}>
      <PanGestureHandler ref={this.panRef}
                         onHandlerStateChange={this._onPanHandlerStateChange}
                         onGestureEvent={this._onPanGestureEvent}
      >
        <Animated.View style={styles.wrapper}>
          <PinchGestureHandler
            ref={this.pinchRef}
            onHandlerStateChange={this._onPinchHandlerStateChange}
            onGestureEvent={this._onPinchGestureEvent}
            simultaneousHandlers={this.panRef}
          >
            <Animated.View style={[
              styles.container,
              {
                transform: [
                  { perspective: 200 },
                  { scale: this._scale },
                  { translateX: this._translateX },
                  { translateY: this._translateY }
                ],
              }
            ]} collapsible={false}>

              <Svg
                width={newWidth}
                height={newHeight}
                color="green"
                viewBox={`0 0 ${newWidth} ${newHeight}`}
              >
                <AnimatedG>
                  {levels.seats.map(seat => (
                    <G key={seat.id}>
                      <Rect
                        x={scale * parseInt(seat.x)}
                        y={scale * parseInt(seat.y)}
                        width={scale * parseInt(seat.w)}
                        height={scale * parseInt(seat.h)}
                        onPress={() => {
                          handleSeatClick(seat.id, seat.row, seat.num, show.prices[seat.type].sum);
                        }}
                        fill={seat.busy === 0 ? 'green' : (selectedSeats[seat.id] !== undefined) ? 'yellow' : 'grey'}
                      />
                      <SvgText
                        y={parseInt(seat.y) * scale + (parseInt(seat.h) * scale * 2 / 3)}
                        x={parseInt(seat.x) * scale + (parseInt(seat.w) * scale / 2)}
                        textAnchor="middle"
                        fontSize={parseInt(seat.h) * scale * 2 / 3}
                        fill="black"
                      >
                        {seat.num}
                      </SvgText>
                    </G>
                  ))}
                  {levels.objects.map(obj => (
                    <SvgText
                      key={obj.id}
                      x={parseInt(obj.x) * scale}
                      y={parseInt(obj.y) * scale + (parseInt(obj.h) * scale * 2 / 3)}
                      fontSize={parseInt(obj.h - 2) * scale}
                    >
                      {obj.name}
                    </SvgText>
                  ))}
                </AnimatedG>
              </Svg>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    width: width,
    height: width,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    width: 400,
    height: 400
  },
});


export default SeatsSelectorAnimatedGestureHandler;

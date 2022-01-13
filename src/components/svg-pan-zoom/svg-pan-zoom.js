import React from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const calcDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

const middle = (p1, p2) => (p1 + p2) / 2;

const calcCenter = (x1, y1, x2, y2) => ({
  x: middle(x1, x2),
  y: middle(y1, y2)
});

class SvgPanZoom extends React.Component {
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    oldScale: new Animated.Value(1),
    isMoving: false,
    isZooming: false
  };

  constructor(props) {
    super(props);

    this.isMoving = false;
    this.isZooming = false;
    this.top = new Animated.Value(0);
    this.left = new Animated.Value(0);
    this.zoom = new Animated.Value(1);
    this.initialTop = new Animated.Value(0);
    this.initialLeft = new Animated.Value(0);
    this.initialZoom = new Animated.Value(1);
    this.initialDistance = 1;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    });
  }

  onPanResponderGrant = (evt, gestureState) => {
    // const { touches } = evt.nativeEvent;
    // const { length } = touches;
    // if (length === 1) {
    //   // this.state.pan.setOffset({
    //   //   x: this.state.pan.x._value,
    //   //   y: this.state.pan.y._value
    //   // });
    //   this.state.pan.setValue({ x: 0, y: 0 });
    // } else if (length === 2) {
    //   // const [touch1, touch2] = touches;
    //   // this.initialZoom = this.state.scale;
    //   // const distance = calcDistance(
    //   //   touch1.pageX,
    //   //   touch1.pageY,
    //   //   touch2.pageX,
    //   //   touch2.pageY
    //   // );
    // }
    return true;
  };

  onPanResponderMoveV2 = (evt, gestureState) => {
    const { maxScale, minScale, viewBoxSize } = this.props;

    const { touches } = evt.nativeEvent;
    const { length } = touches;

    if (length === 1) {
      this.state.pan.setValue({
        x: gestureState.dx,
        y: gestureState.dy
      });
    } else if (length === 2) {
      const [touch1, touch2] = touches;
      const distance = calcDistance(
        touch1.locationX,
        touch1.locationY,
        touch2.locationX,
        touch2.locationY
      );
      const { x, y } = calcCenter(
        touch1.locationX,
        touch1.locationY,
        touch2.locationX,
        touch2.locationY
      );

      if (!this.isZooming) {
        this.isZooming = true;
        this.initialX = x;
        this.initialY = y;
        this.initialTop = this.state.pan.y;
        this.initialLeft = this.state.pan.x;
        this.initialZoom = this.state.scale;
        this.initialDistance = distance;
      } else {
        const touchZoom = distance / this.initialDistance;
        const dx = x - this.initialX;
        const dy = y - this.initialY;
        const newX = (this.initialLeft._value + dx - x) * touchZoom + x;
        // const newX = this.initialLeft._value + dx;
        const newY = (this.initialTop._value + dy - y) * touchZoom + y;
        // const newY = this.initialTop._value + dy;
        let newZoom = this.initialZoom._value * (touchZoom);

        if (newZoom < minScale) {
          newZoom = minScale;
        }
        if (newZoom > maxScale) {
          newZoom = maxScale;
        }
        this.state.pan.setValue({ x: newX, y: newY });
        this.state.scale.setValue(newZoom);
        this.state.oldScale = this.state.scale;
      }
    }
  };

  onPanResponderReleaseV2 = (evt, gestureState) => {
    this.state.pan.flattenOffset();
    this.isZooming = false;
    // this.initialZoom = this.state.scale;
  };

  onPanResponderRelease = (evt, gestureState) => {
    // this.state.oldScale = this.state.scale;
    this.isMoving = false;
    this.isZooming = false;
  };

  processTouch = (x, y) => {
    const { width, height } = this.props;
    if (!this.isMoving || this.isZooming) {
      this.isMoving = true;
      this.isZooming = false;
      this.initialTop = this.top;
      this.initialLeft = this.left;
      this.initialX = x;
      this.initialY = y;
    } else {
      const dx = x - this.initialX;
      const dy = y - this.initialY;
      const newX = this.initialLeft._value + dx;
      const newY = this.initialTop._value + dy;

      // Ограничение по правому края
      if (newX < 0 && Math.abs(newX) > (width)) {
        // newX = -width;
      }
      // Ограничение по левому краю
      if (newX > 0 && Math.abs(newX) > 0) {
        // newX = 0;
      }
      // Ограничение по верхнему краю
      if (newY > 0 && Math.abs(newY) > 0) {
        // newY = 0;
      }
      // Ограничение по нижнему краю
      if (newY < 0 && Math.abs(newY) > height) {
        // newY = -height;
      }

      Animated.parallel([
        Animated.timing(this.left, {
          toValue: newX,
          duration: 0,
          // useNativeDriver: true
        }),
        Animated.timing(this.top, {
          toValue: newY,
          duration: 0,
          // useNativeDriver: true
        })
      ]).start();
    }
  };

  processPinch = (x1, y1, x2, y2) => {
    const distance = calcDistance(x1, y1, x2, y2);
    const { x, y } = calcCenter(x1, y1, x2, y2);
    const { maxScale, minScale } = this.props;

    if (!this.isZooming) {
      this.isZooming = true;
      this.initialX = x;
      this.initialY = y;
      this.initialTop = this.top;
      this.initialLeft = this.left;
      this.initialZoom = this.zoom;
      this.initialDistance = distance;
    } else {
      const touchZoom = distance / this.initialDistance;
      const dx = x - this.initialX;
      const dy = y - this.initialY;
      const newX = (this.initialLeft._value + dx - x) * touchZoom + x;
      const newY = (this.initialTop._value + dy - y) * touchZoom + y;
      let newZoom = this.initialZoom._value * touchZoom;

      if (newZoom < minScale) {
        newZoom = minScale;
      }
      if (newZoom > maxScale) {
        newZoom = maxScale;
      }
      Animated.parallel([
        Animated.timing(this.left, {
          toValue: newX,
          duration: 0,
          // useNativeDriver: true
        }),
        Animated.timing(this.top, {
          toValue: newY,
          duration: 0,
          // useNativeDriver: true
        }),
        Animated.timing(this.zoom, {
          toValue: newZoom,
          duration: 0,
          // useNativeDriver: true
        })
      ]).start();
    }
  };

  onPanResponderMove = (evt) => {
    const { touches } = evt.nativeEvent;
    const { length } = touches;
    if (length === 1) {
      const [{ locationX, locationY }] = touches;
      this.processTouch(locationX, locationY);
    } else if (length === 2) {
      const [touch1, touch2] = touches;
      this.processPinch(
        touch1.locationX,
        touch1.locationY,
        touch2.locationX,
        touch2.locationY
      );
    }
  };

  render() {
    const {
      width,
      height,
      children,
      viewBoxSize,
      minScale,
      maxScale
    } = this.props;
    const resolution = new Animated.Value(viewBoxSize / (Math.min(width, height)));
    const { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];

    return (
      <View
        style={{ width: viewBoxSize, height: viewBoxSize }}
        {...this.panResponder.panHandlers}

      >
        <Animated.View
          style={
            [StyleSheet.absoluteFill,
              {
                transform: [
                  {
                    translateX: this.left
                  },
                  {
                    translateY: this.top
                  },
                  {
                    scale: this.zoom
                  }
                ],
                width,
                height
              }
            ]
          }
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}

SvgPanZoom.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  viewBoxSize: PropTypes.number.isRequired,
  minScale: PropTypes.number,
  maxScale: PropTypes.number
};

export default SvgPanZoom;

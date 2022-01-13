import React from 'react';
import {
  View,
  PanResponder,
  Dimensions
} from 'react-native';

import {
  G,
  Rect,
  Svg
} from 'react-native-svg';
import HallSvgDrawer from "../hall-svg-drawer";
import {SvgPanZoomElement} from "react-native-svg-pan-zoom";

const { width, height } = Dimensions.get('window');

function getPrice(prices, type) {
  return prices[type].sum;
}


function seatColor(type, types) {
  const price = types[type].sum;

  if (price < 1500) {
    return '#00ad1a';
  }

  if (price < 2000) {
    return '#86048a';
  }

  if (price < 2500) {
    return '#bd5000';
  }
  return '#940400';
};

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

class SeatsSelectorSvg extends React.Component {
  counter = 0;
  countasd = 0;
  constructor(props) {

    super(props);
    this.state = {
      zoom: 1,
      left: 0,
      top: 0,
    };
    this.rect = (element) => {
    };
  }

  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2);
    const { x, y } = calcCenter(x1, y1, x2, y2);

    if (!this.state.isZooming) {
      const { top, left, zoom } = this.state;
      this.setState({
        isZooming: true,
        initialX: x,
        initialY: y,
        initialTop: top,
        initialLeft: left,
        initialZoom: zoom,
        initialDistance: distance,
      });
    } else {
      const {
        initialX,
        initialY,
        initialTop,
        initialLeft,
        initialZoom,
        initialDistance,
      } = this.state;

      const touchZoom = distance / initialDistance;
      const dx = x - initialX;
      const dy = y - initialY;
      const left = (initialLeft + dx - x) * touchZoom + x;
      const top = (initialTop + dy - y) * touchZoom + y;
      let zoom = initialZoom * touchZoom;
      if (zoom < 1) {
        zoom = 1;
      }

      this.setState({
        zoom,
        left,
        top,
      });
    }
  }

  processTouch(x, y) {
    if (!this.state.isMoving || this.state.isZooming) {
      const { top, left } = this.state;
      this.setState({
        isMoving: true,
        isZooming: false,
        initialLeft: left,
        initialTop: top,
        initialX: x,
        initialY: y,
      });
    } else {
      const {
        initialX, initialY, initialLeft, initialTop
      } = this.state;
      const dx = x - initialX;
      const dy = y - initialY;
      this.setState({
        left: initialLeft + dx,
        top: initialTop + dy,
      });
    }
  }

  shouldPanResponder = (evt, gestureState) => {
    const { dx, dy, numberActiveTouches } = gestureState;

    if (numberActiveTouches === 2) {
      return true;
    }
    if (Math.sqrt(dx * dx + dy * dy) > 5) {
      return true;
    }


    return false;
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderMove: (evt) => {
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
      },
      onPanResponderRelease: (evt, {dx, dy}) => {
        const { left, top, zoom } = this.state;
        const { handleSeatClick, show } = this.props;
        const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];

        if (Math.sqrt(dx * dx + dy * dy) < 5) {
          const touchedX = (evt.nativeEvent.locationX - left) / zoom;
          const touchedY = (evt.nativeEvent.locationY - top) / zoom;

          const selectedSeat = levels.seats.find((seat) => {
            if (
              (
                parseInt(seat.x, 10) - 5 <= touchedX
                && touchedX <= parseInt(seat.x, 10) + parseInt(seat.w, 10) + 5
              ) && (
                parseInt(seat.y, 10) - 5 <= touchedY
                && touchedY <= parseInt(seat.y, 10) + parseInt(seat.h, 10) + 5
              )
            ) {
              return true;
            }
            return false;
          });

          if (selectedSeat) {
            if (selectedSeat.busy !== 1) {
              handleSeatClick(
                selectedSeat.id,
                selectedSeat.row,
                selectedSeat.num,
                getPrice(show.prices, selectedSeat.type)
              );
            }
          }
        }

        this.setState({
          isZooming: false,
          isMoving: false,
        });
      },
    });
  }

  render() {
    const {
      theme,
      t,
      show,
    } = this.props;
    const { left, top, zoom } = this.state;
    const viewBoxSize = width;
    const resolution = viewBoxSize / (Math.min(height, width));

    const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];

    return (
      <View {...this._panResponder.panHandlers}>
        <Svg
          viewBox={`0 0 ${width - 10} ${width - 10}`}
          width={width}
          height={width}
          ref={svg => this._svg = svg}
        >
          <G
            transform={{
              translateX: left * resolution,
              translateY: top * resolution,
              scale: zoom,
            }}
          >
            <SeatRenderer levels={levels}/>
          </G>
        </Svg>
      </View>
    );
  }
}

class SeatRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.levels !== nextProps.levels;
  }

  render() {
    const { levels } = this.props;

    return (
      <G>
        {levels.seats.map(seat => (
          <Rect
            key={seat.id}
            x={seat.x}
            y={seat.y}
            width={seat.w}
            height={seat.h}
            fill={seat.busy === 0 ? 'grey' : 'green'}
          />
          ))}
      </G>
    );
  }
}

export default SeatsSelectorSvg;

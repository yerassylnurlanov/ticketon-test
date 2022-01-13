import React from 'react';
import Svg, {G, Rect, Text} from 'react-native-svg';
import {Animated} from "react-native";

class SectorSvgDrawer extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const {oldSeats} = this.props.seats;
    const {newSeats} = nextProps.seats;

    if (oldSeats !== newSeats) {
      return true;
    }
    return false;
  }

  render() {
    const {seats, width, height} = this.props;

    return (
      <G>
        <Rect x={0} y={0} width={width} height={height} fill='white'/>
        {seats.map(seat => (
          <Rect
            key={seat.id}
            x={seat.x}
            y={seat.y}
            width={seat.w}
            height={seat.h}
            onPress={() => alert(seat.id)}
            fill={seat.busy === 0 ? 'grey' : 'green'}
          />
        ))}
      </G>
    );
  }
};

export default SectorSvgDrawer;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import Svg, { G, Rect, Text as SvgText, Polygon } from 'react-native-svg';

import Spinner from '../spinner';
import SvgPanZoom from '../svg-pan-zoom';

const { width, height } = Dimensions.get('window');

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  }
});

const getPrice = (prices, type) => {
  return prices[type].sum;
};


const getColor = (busy, selectedSeats, id) => {
  if (busy) {
    return 'grey';
  }
  if (selectedSeats[id] !== undefined) {
    return 'yellow';
  }
  return get;
};

const scale = 2;

const renderObject = (object) => {
  switch (object.type) {
    case 'row':
      return (
        <SvgText
          key={object.id}
          x={parseInt(scale*object.x)}
          y={parseInt(scale*object.y) + (parseInt(scale*object.h) * 2/3)}
          fill={`#${object.color}`}
        >
          {object.name}
        </SvgText>
      );
    case false:
      return (
        <SvgText
          key={object.id}
          x={parseInt(scale*object.x)}
          y={parseInt(scale*object.y) + (parseInt(scale*object.h) * 2/3)}
          fill={`#${object.color}`}
        >
          {object.name}
        </SvgText>
      );
  }
};

class SeatsSelector extends React.Component {

  render() {
    const { theme, t, handleSeatClick } = this.props;
    const { show, selectedSeats } = this.props;
    const styles = getStyles(theme);

    const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];

    return (
      <SvgPanZoom width={scale * levels.width} height={scale * levels.height}>
        <Svg
          width="500"
             height="500"
             fill="blue"
             stroke="red"
             color="green"
             viewBox="0 0 600 600"
        >
        {levels.seats.map(seat => (
          <G key={seat.id}>
            <Rect
              x={scale * seat.x}
              y={scale * seat.y}
              width={scale * seat.w}
              height={scale * seat.h}
              onPress={() => {
                if (seat.busy === 0) {
                  //handleSeatClick(seat.id, seat.row, seat.num, getPrice(show.prices, seat.type));
                }
              }}
              // fill={seat.busy === 0 ? 'green' : (selectedSeats[seat.id] !== undefined) ? 'yellow' : 'grey'}
              fill={getColor(seat.busy, selectedSeats, seat.id)}
            />
            <SvgText
              y={parseInt(scale * seat.y) + (parseInt(scale * seat.h) * 2/3)}
              x={parseInt(scale * seat.x) + (parseInt(scale * seat.w) / 2)}
              textAnchor="middle"
              fontSize={parseInt(scale*seat.h * 2/3)}
              fill="black"
            >
              {seat.num}
            </SvgText>
            {levels.objects.map((obj) => {
              return renderObject(obj);
            })}

          </G>
        ))}
        </Svg>
      </SvgPanZoom>
    );
  }
}

export default SeatsSelector;

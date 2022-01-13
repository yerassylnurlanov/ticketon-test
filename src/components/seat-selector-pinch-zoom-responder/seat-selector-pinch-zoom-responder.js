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
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath'
import PinchZoomResponder from 'react-native-pinch-zoom-responder'

const scale = 1;
class SeatSelectorPinchZoomResponder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 1,
      height: 1
    };
    this.pinchZoomResponder = new PinchZoomResponder({
      onPinchZoomStart: (e) => {

      },

      onPinchZoomEnd: (e) => {
      },

      onResponderMove: (e, gestureState) => {
        if (gestureState) {
          var transform = this._applyOriginTransform(gestureState.transform);
          this._setTransform(transform);
        }
      }
    });
  }

  _onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    })
  }

  _setTransform(matrix) {
    this._svg.setNativeProps({ style: { transform: [{ perspective: 1000 }, { matrix: matrix }] } })
  }

  /*
  React Native view transforms have the component center as their origin,
  so we need to wrap our transform with translations that compensate for this and
  place the origin at 0,0
  */
  _applyOriginTransform(matrix) {
    var translate = MatrixMath.createIdentityMatrix()
    var copy = matrix.slice()
    MatrixMath.reuseTranslate2dCommand(translate, (this.state.width / 2.0), (this.state.height / 2.0))
    MatrixMath.multiplyInto(copy, matrix, translate)
    MatrixMath.reuseTranslate2dCommand(translate, -(this.state.width / 2.0), -(this.state.height / 2.0))
    MatrixMath.multiplyInto(copy, translate, copy)
    return copy
  }

  render() {
    const { show, selectedSeats, handleSeatClick } = this.props;
    const levels = show.hall.levels[Object.keys(show.hall.levels).pop()];
    const newWidth = scale * levels.width;
    const newHeight = scale * levels.height;

    return (
      <View {...this.pinchZoomResponder.handlers} onLayout={(e) => this._onLayout(e)}>
        <Svg
          width="100%"
          height="100%"
          color="green"
          viewBox={`0 0 ${newWidth} ${newHeight}`}
          ref={svg => this._svg = svg}
        >
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
                // fill={getColor(seat.busy, selectedSeats, seat.id)}
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
          {levels.objects.map(obj => {
            return (
              <SvgText
                key={obj.id}
                x={parseInt(obj.x) * scale}
                y={parseInt(obj.y) * scale + (parseInt(obj.h) * scale * 2 / 3)}
                fontSize={parseInt(obj.h - 2) * scale}
              >
                {obj.name}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    );
  }
}

export default SeatSelectorPinchZoomResponder;

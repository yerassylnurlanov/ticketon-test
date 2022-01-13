import React from 'react';
import Svg, {G, Rect, Text, Path, Polygon} from 'react-native-svg';
import {Animated} from 'react-native';
import { SvgPanZoomElement } from 'react-native-svg-pan-zoom';

class HallSvgDrawer extends React.Component {

  componentWillMount() {
    const { seats, objects } = this.props;

    const objectsInState = objects.map(obj => {
      switch (obj.type) {
        case 'row':
          return <Text key={obj.id} x={4*obj.x} y={4*obj.y}>{obj.name}</Text>;
        case 'scene':
          if (obj.w && obj.h && obj.x && obj.y) {
            return <Text key={obj.id} x={4*obj.x} y={4*obj.y} w={4*obj.w} h={4*obj.h}>{obj.name}</Text>
          }
          return null;
        case false:
          return <Text key={obj.id} x={4*obj.x} y={4*obj.y}>{obj.name}</Text>
        default:
          return null;
      }
    });

    const seatsInState = seats.map(seat => (
      <SvgPanZoomElement
        key={seat.id}
        x={seat.x}
        y={seat.y}
        onClick         = {()=>{ () => alert(seat.id) }}
        onClickCanceled = {()=>{ console.log('onClickCanceled!') }}
        onClickRelease  = {()=>{ () => alert(seat.id) }}
        onDrag          = {()=>{ console.log('onDrag!') }}
        releasedNaturally={false}
      >
        <Rect
          key={seat.id}
          x={seat.x}
          y={seat.y}
          width={seat.w}
          height={seat.h}
          onPress={() => alert(seat.id)}
          fill={seat.busy === 0 ? 'grey' : 'green'}
        />
      </SvgPanZoomElement>
    ));

    this.setState({
      seats: seatsInState,
      objects: objectsInState
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {oldSeats} = this.props.seats;
    const {newSeats} = nextProps.seats;

    if (oldSeats !== newSeats) {
      return true;
    }
    return false;
  }

  render() {
    const { seats, objects } = this.state;
    return (
      <G>
        {seats}
        {/*{objects}*/}
      </G>
    );
  }
};

export default HallSvgDrawer;

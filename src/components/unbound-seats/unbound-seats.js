import React from 'react';
import { View, Text, FlatList } from 'react-native';
import UnboundSeatsItem from '../unbound-seats-item';

class UnboundSeats extends React.Component {
  state = {
    selectedSeats: []
  };

  handleSeatCountClick = (seat) => {
    console.log(seat);
    const { handleSeatClick } = this.props;
    const { selectedSeats } = this.state;
    const count = selectedSeats.reduce((acc, el) => acc + el.purchaseCount, 0);
    const alreadySelected = selectedSeats.find(el => el.id === seat.id);

    if (selectedSeats.find(el => el.id === seat.id)) {
      if (selectedSeats.filter(el => el.id !== seat.id).reduce((acc, el) => acc + el.purchaseCount,0) + seat.purchaseCount > 5) {
        handleSeatClick({error: 'max'});
        return;
      }
      this.setState(prevState => {
        const newSelectedSeats = prevState.selectedSeats.filter(el => el.id !== seat.id);
        handleSeatClick({
          seats: newSelectedSeats
        });
        return {
          selectedSeats: newSelectedSeats
        };
      });
      if (alreadySelected.purchaseCount !== seat.purchaseCount && selectedSeats.filter(el => el.id !== seat.id).reduce((acc, el) => acc + el.purchaseCount,0) + seat.purchaseCount <= 5) {
        this.setState(prevState => {
          const newSelectedSeats = [...prevState.selectedSeats, seat];
          handleSeatClick({
            seats: newSelectedSeats
          });
          return {
            selectedSeats: newSelectedSeats
          };
        });
      }
      return;
    }

    if (count + seat.purchaseCount <= 5) {
      this.setState(prevState => {
        const newSelectedSeats = [...prevState.selectedSeats, seat];
        handleSeatClick({
          seats: newSelectedSeats
        });
        return {
          selectedSeats: newSelectedSeats
        }
      });
    } else {
      handleSeatClick({error: 'max'});
      return;
    }
  };

  render() {
    const { level } = this.props;
    const { selectedSeats } = this.state;

    const data = level.seats.filter(el => (el.count > 0 && el.sale !== 0));

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <UnboundSeatsItem
                seat={item}
                selectedSeats={selectedSeats}
                handlePress={this.handleSeatCountClick}
                name={(level.types[item.type]) ? level.types[item.type].name : '' }
              />
            );
          }}
        />
      </View>
    );
  }
}

export default UnboundSeats;

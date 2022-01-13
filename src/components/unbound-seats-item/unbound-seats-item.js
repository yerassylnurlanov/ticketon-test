import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: 8,
  },
  name: {
    color: theme.fontMain,
    fontSize: 16
  },
  count: {
    color: theme.fontMain,
    fontSize: 14,
    marginBottom: 8,
  },
  countButton: {
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.appBar
  },
  selectedCountButton: {
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  countButtonText: {
    fontWeight: '600',
    fontSize: 16
  }
});

class UnboundSeatsItem extends React.Component {
  state = {
    selectedUnboundSeats: [],
    count: 0
  };

  handleSelectSeat = (seat) => {
    const { selectedUnboundSeats, count } = this.state;
  }

  render() {
    const {
      handlePress,
      t,
      seat,
      name,
      theme,
      selectedSeats
    } = this.props;

    const styles = getStyles(theme);
    const selectedSeat = selectedSeats.find(el => el.id === seat.id);
    const selectedSeatCount = (selectedSeat) ? selectedSeat.purchaseCount : undefined;
    return (
      <View style={styles.root}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.count}>{t('ticketsCount')}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={(selectedSeatCount === 1) ? styles.selectedCountButton : styles.countButton}
            onPress={() => handlePress({ ...seat, purchaseCount: 1 })}
          >
            <Text style={styles.countButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedSeatCount === 2) ? styles.selectedCountButton : styles.countButton}
            onPress={() => handlePress({ ...seat, purchaseCount: 2 })}
          >
            <Text style={styles.countButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedSeatCount === 3) ? styles.selectedCountButton : styles.countButton}
            onPress={() => handlePress({ ...seat, purchaseCount: 3 })}>
            <Text style={styles.countButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedSeatCount === 4) ? styles.selectedCountButton : styles.countButton}
            onPress={() => handlePress({ ...seat, purchaseCount: 4 })}>
            <Text style={styles.countButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(selectedSeatCount === 5) ? styles.selectedCountButton : styles.countButton}
            onPress={() => handlePress({ ...seat, purchaseCount: 5 })}>
            <Text style={styles.countButtonText}>5</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withTranslation()(withTheme(UnboundSeatsItem));

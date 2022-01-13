import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 1,
    paddingVertical: 4
  },
  timePriceContainer: {
    flex: 4,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameDescContainer: {
    flex: 6,
    margin: 8,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  timeLabel: {
    textAlign: 'center',
    color: theme.fontMain,
    fontSize: 14,
  },
  priceLabel: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '600'
  },
  nameLabel: {
    color: theme.fontMain,
    fontSize: 16
  },
  descriptionLabel: {
    color: theme.fontDesc,
    fontSize: 14
  },
  typeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeText: {
    // backgroundColor: 'red',
    transform: [{ rotate: '270deg' }],
    fontSize: 8,
    fontWeight: '400',
    color: theme.appBar
  }
});

const SessionItemTime = (
  {
    t,
    time,
    price,
    name,
    description,
    theme,
    lang,
    format,
    availableSeats
  }
) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.timePriceContainer}>
        <Text style={styles.timeLabel}>{time} {lang ? `(${lang})` : ''}</Text>
        <Text style={styles.priceLabel}>{price}</Text>
        {availableSeats ? (
          <Text style={styles.timeLabel}>{(availableSeats > 0) ? t('availableSeats') + ': ' + availableSeats : t('noSeats')}</Text>
        ) : null}
      </View>
      <View style={styles.nameDescContainer}>
        <Text style={styles.nameLabel}>{name}</Text>
        <Text
          style={styles.descriptionLabel}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>{(format !== '') ? format : ''}</Text>
      </View>
    </View>
  );
};

SessionItemTime.propTypes = {
  time: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  availableSeats: PropTypes.number
};

export default withTranslation()(withTheme(SessionItemTime));

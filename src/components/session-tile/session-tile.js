import React from 'react';
import {
  View,
  Text,
  StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.appBar,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderWidth: 1,
    margin: 8,
    marginLeft: 0,
    borderRadius: 5
  },
  time: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  price: {
    fontSize: 15,
    color: theme.fontMain
  }
});

const SessionTile = (
  {
    theme,
    time,
    disabled,
    handleSelect,
    availableSeats,
    t,
    lang,
    price
  }
) => {
  const styles = getStyles(theme);

  if (!disabled) {
    return (
      <View style={styles.root}>
        <Text style={styles.time}>{time} {lang ? `(${lang})` : ''}</Text>
        <Text style={styles.price}>{price}</Text>
        {availableSeats ? (
          <Text style={styles.price}>{(availableSeats > 0) ? t('availableSeats') + ': ' + availableSeats : t('noSeats')}</Text>
        ) : null}
      </View>
    );
  } else {
    return null;
  }
};

export default withTranslation()(withTheme(SessionTile));

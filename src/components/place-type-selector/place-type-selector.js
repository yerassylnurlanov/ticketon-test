import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: theme.appBar,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  item: {
    margin: 8
  },
  itemLabel: {
    fontSize: 16,
    color: theme.fontMain
  },
  selectedItemLabel: {
    fontSize: 16,
    color: theme.headerBarTint
  }
});

const PlaceTypeSelector = (
  {
    price,
    selectedType,
    handleSelectType,
    theme
  }
) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleSelectType(0)}
      >
        <Text
          style={(selectedType === 0) ? styles.selectedItemLabel : styles.itemLabel}
        >
          {price.name}
        </Text>
      </TouchableOpacity>
      {price.discounts.map((type, idx) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleSelectType(idx + 1)}
        >
          <Text
            style={(selectedType === idx + 1) ? styles.selectedItemLabel : styles.itemLabel}
          >
            {type.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

PlaceTypeSelector.propTypes = {
  price: PropTypes.array,
  selectedType: PropTypes.string,
  handleSelectType: PropTypes.func
};

export default withTheme(PlaceTypeSelector);

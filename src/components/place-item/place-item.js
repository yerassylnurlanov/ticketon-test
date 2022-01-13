import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Icon
} from 'native-base';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    // borderWidth: 1,
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    color: theme.fontMain
  },
  description: {
    fontSize: 12,
    color: theme.fontDesc
  },
  textContainer: {
    flex: 6
  },
  btnContainer: {
    flex: 1
  }
});

const PlaceItem = (
  {
    place,
    theme,
    handleBuildRoad,
    handlePlaceSelect
  }
) => {
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => handlePlaceSelect(place)}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{place.place_name}</Text>
          <Text style={styles.description}>{place.place_address}</Text>
        </View>
      </TouchableOpacity>
      {/*<View style={styles.btnContainer}>*/}
      {/*  <TouchableOpacity onPress={handleBuildRoad}>*/}
      {/*    <Button transparent>*/}
      {/*      <Icon name="map-marker" type="FontAwesome" />*/}
      {/*    </Button>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
};

export default withTheme(PlaceItem);

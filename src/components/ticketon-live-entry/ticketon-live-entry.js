import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { mediaURL, ticketon } from '../../consts/urls';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    // justifyContent: 'space-between'
  },
  image: {
    alignSelf: 'center',
    height: undefined,
    width: '100%',
    aspectRatio: 2
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 6,
    marginRight: 16,
    // alignSelf: 'flex-end'
  }
});

const TicketonLiveEntry = ({
  image,
  description,
  title,
  video
}) => {
  const styles = getStyles();

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video}`)}>
        <Image
          defaultSource={require('../../assets/img/default-image.png')}

          style={styles.image}
          source={{ uri: `${ticketon}${image}?h=300` }}
        />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TicketonLiveEntry;

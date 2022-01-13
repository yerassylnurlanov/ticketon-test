import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  progressDotInactive: {
    color: 'white',
    marginHorizontal: -7
  },
  progressDotActive: {
    color: 'grey',
    marginHorizontal: -7
  },
  progressDotsContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const ProgressDots = ({ total, chosen }) => {
  const dots = [];

  for (let i = 0; i < total; i++) {
    dots.push((<Icon name="dot-single" type="Entypo" style={(i !== chosen) ? styles.progressDotActive : styles.progressDotInactive} key={i} />));
  }

  return (
    <View style={styles.progressDotsContainer}>
      {dots}
    </View>
  );
};

export default ProgressDots;

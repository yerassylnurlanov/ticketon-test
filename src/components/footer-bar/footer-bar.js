import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  footer: {
    height: 48,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#255B6D',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 16
  }
});

const FooterBar = ({ leftElement, centerElement, rightElement }) => (
  <View style={styles.footer}>
    <View style={styles.left}>
      {leftElement}
    </View>
    <View style={styles.center}>
      {centerElement}
    </View>
    <View style={styles.right}>
      {rightElement}
    </View>
  </View>
);

export default FooterBar;

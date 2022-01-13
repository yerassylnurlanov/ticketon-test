import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const PreloaderView = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator />
  </View>
);

export default PreloaderView;

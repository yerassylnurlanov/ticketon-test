import React from 'react';
import {
  View,
  Text
} from 'react-native';

const ErrorIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Something went wrong(((
      </Text>
    </View>
  );
};

export default ErrorIndicator;

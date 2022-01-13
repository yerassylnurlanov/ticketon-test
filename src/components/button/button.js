import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
// import {SocialIcon} from "react-native-elements";

const styles = StyleSheet.create({
  button: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }
});

const Button = ({ label, onClick }) => (
  <TouchableOpacity
    onPress={onClick}
    style={styles.button}
  >
    <Text>{label}</Text>
  </TouchableOpacity>
);

export default Button;

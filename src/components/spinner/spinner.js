import React from 'react';
import { View, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const Spinner = () => {
  const size = wp(10);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <LottieView
        style={{
          width: size,
          height: size,
        }}
        source={require('../../assets/loaders/data.json')} autoPlay loop
      /> */}
      {/*<ActivityIndicator />*/}
    </View>
  );
};

export default Spinner;

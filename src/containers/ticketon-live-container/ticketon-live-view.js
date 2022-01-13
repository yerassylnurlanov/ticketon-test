import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import TicketonLiveEntry from '../../components/ticketon-live-entry/ticketon-live-entry';

const TicketonLiveView = (
  {
    data
  }
) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {data.list.map(el => (
          <TicketonLiveEntry key={el.id} {...el} />
        ))}
      </ScrollView>
      <Text>
        Ticketon Live
      </Text>
    </View>
  );
};

export default TicketonLiveView;

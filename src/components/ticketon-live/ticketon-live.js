import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text, TouchableOpacity
} from 'react-native';
import { serverURL } from '../../consts/urls';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import TicketonLiveEntry from '../ticketon-live-entry/ticketon-live-entry';

const getStyles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.homeTileBackground,
    // borderWidth: 1,
    height: 200,
    borderColor: 'black',
    paddingHorizontal: 16,
    borderRadius: 2
  },
  title: {
    fontSize: 20,
    marginVertical: 8
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreBtn: {
    alignSelf: 'flex-end'
  },
});

const TicketonLive = ({ items, theme, t, handleTicketonLiveMore }) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>Ticketon Live</Text>
        <TouchableOpacity onPress={handleTicketonLiveMore}>
          <Text>{t('more').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        bounces
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={
          ({ item }) => (
            <TicketonLiveEntry
              image={item.image}
              description={item.description}
              title={item.title}
              video={item.video}
            />
          )
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default compose(withTheme, withTranslation())(TicketonLive);

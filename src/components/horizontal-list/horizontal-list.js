import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import FlatListEntry from '../flatlist-entry';
import { ticketon } from '../../consts/urls';
import withTheme from '../../hoc/withTheme';
import { borderRad } from '../../consts';

const getStyles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.homeTileBackground,
    borderWidth: 0,
    borderColor: 'black',
    paddingHorizontal: 16,
    borderRadius: borderRad,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreBtn: {
    alignSelf: 'flex-end'

  },
  title: {
    fontSize: 20,
    marginVertical: 8,
    color: theme.fontMain,
    fontWeight: '600'
  }
});

const HorizontalList = (
  {
    items,
    title,
    theme,
    t,
    moreEnabled = false,
    handleEventSelect,
    handleCategorySelect
  }
) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        {(moreEnabled) ? (
          <TouchableOpacity onPress={handleCategorySelect}>
            <Text>{t('more').toUpperCase()}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        bounces
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={
          ({ item }) => (
            <TouchableOpacity onPress={() => handleEventSelect(item)}>
              <FlatListEntry
                comingSoon={item.comingSoon}
                popular={item.popular}
                imageURL={ticketon + item.event_main_image}
                description={item.event_name}
                price={item.event_min_price_text}
              />
            </TouchableOpacity>
          )
        }
        keyExtractor={item => item.event_id.toString()}
      />
    </View>
  );
};

export default compose(withTheme, withTranslation(), withNavigation)(HorizontalList);

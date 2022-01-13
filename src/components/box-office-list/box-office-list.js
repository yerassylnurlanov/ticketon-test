import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  List,
  ListItem,
  Text,
} from 'native-base';
import { useTranslation } from 'react-i18next';
import StarRating from 'react-native-star-rating';
import { borderRad } from '../../consts';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderWidth: 0.2,
    borderColor: 'black',
    borderRadius: borderRad,
  },
  list: {
    flex: 1
  },
  header: {
    borderRadius: borderRad,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'grey',
    paddingBottom: Platform.OS === 'ios' ? 16 : 16
  },
  headerContainer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  headerTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: 'white'
  },
  period: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: 'white'
  },
  element: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  title: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  boxOfficeText: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  rating: {
    alignSelf: 'flex-end'
  },
  star: {
    marginTop: 8
  }
});

const BoxOfficeComponent = (
  {
    items = [],
    period = '22-27 апреля',
    handleEventSelect
  }
) => {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.root}>
      <List style={styles.list}>
        <ListItem itemHeader first style={styles.header}>
          <Text style={styles.headerTitle}>{t('cashGatherings')}</Text>
          <Text style={styles.period}>
            {`${t('cashGatheringsPeriod')}: ${period}`}
          </Text>
        </ListItem>
        {items.map((el, idx) => (
          <ListItem key={(el.eventId) ? el.eventId : idx} style={styles.element}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row'}}
              onPress={() => handleEventSelect(el)}
            >
              <View style={styles.leftContainer}>
                <Text style={styles.title}>{`${idx + 1}. ${el.event_name}`}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.boxOfficeText}>
                  {`${Math.round(el.weekly_gross).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                </Text>
                <StarRating
                  starStyle={styles.star}
                  halfStar="star-half"
                  fullStar="star"
                  iconSet={'FontAwesome'}
                  starSize={10}
                  containerStyle={styles.rating}
                  disabled
                  maxStars={el.event_rating}
                  rating={el.event_rating}
                  fullStarColor={'grey'}
                />
              </View>
            </TouchableOpacity>
          </ListItem>
        ))}
      </List>
    </View>
  );
};

export default BoxOfficeComponent;

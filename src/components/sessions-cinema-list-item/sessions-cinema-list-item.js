import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import withTheme from '../../hoc/withTheme';
import StarRating from '../star-rating';
import SessionTile from '../session-tile';
import {
  ScrollView,
  FlatList
} from 'react-native-gesture-handler';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingBottom: 8,
    marginTop: 8
  },
  descriptionContainer: {
    flex: 2,
    flexDirection: 'row',
    margin: 8
  },
  titleLabel: {
    fontSize: hp(2),
    color: theme.fontMain,
    fontWeight: '500'
  },
  descriptionLabel: {
    fontSize: hp(1.5),
    color: theme.fontDesc,
    // fontWeight:
  },
  sessionsContainer: {
    flex: 3,
    marginHorizontal: 8
  },
  imageContainer: {
    marginRight: 8,
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 2/3,
    width: wp(25),
    height: undefined,
  },
  titleDescriptionContainer: {
    flexDirection: 'column'
  }
});

const SessionsCinemaListItem = (
  {
    t,
    theme,
    eventImageUrl,
    eventName,
    eventDescription,
    rating,
    sessions,
    handleSessionSelect
  }
) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: eventImageUrl}}/>
        </View>
        <View style={styles.sessionsContainer}>
          <Text style={styles.titleLabel}>{eventName}</Text>
          <Text style={styles.descriptionLabel} numberOfLines={2}>{eventDescription}</Text>
          <StarRating
            maxRating={10}
            rating={rating}
          />
        </View>
      </View>
      <View style={styles.sessionsContainer}>
        <View>
          <ScrollView
            horizontal
          >
            {
              sessions.map(session => {
                const datetime = Math.round(+new Date() / 1000);
                if (datetime > session.ts) {
                  return null;
                }
                return (
                  <TouchableOpacity onPress={() => {handleSessionSelect(session.show_id)}}>
                    <SessionTile
                      key={session.ts}
                      lang={session.lang}
                      time={session.datetime}
                      price={session.price}
                      availableSeats={session.availableSeats}
                    />
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

SessionsCinemaListItem.propTypes = {
  eventImageUrl: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  sessions: PropTypes.array,
}

export default withTranslation()(withTheme(SessionsCinemaListItem));

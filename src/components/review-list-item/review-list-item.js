import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import StarRating from 'react-native-star-rating';
import withTheme from '../../hoc/withTheme';
import { Icon } from "native-base";

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: theme.fontDesc,
    borderBottomWidth: 1
  },
  ratingNameContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  ratingFromContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  reviewHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  reviewBody: {
    flex: 2,
    flexDirection: 'column'
  },
  reviewFooter: {
    flex: 1,
    marginTop: 16,
    alignItems: 'flex-end'
  },
  readFurtherLabel: {
    color: theme.fontMain
  },
  ratingContainer: {
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  title: {
    color: theme.fontMain,
    fontSize: 18,
  },
  reviewText: {
    color: theme.fontMain
  },
  date: {
    color: theme.fontDesc,
    fontSize: 14
  },
  fromText: {
    color: theme.fontDesc
  }
});

const ReviewListItem = ({
  title,
  rating,
  user,
  date,
  reviewText,
  theme,
  t
}) => {
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingNameContainer}>
          {/*<Text style={styles.title}>{title}</Text>*/}
          <View style={styles.ratingFromContainer}>
            {(rating === "1") ? (
                <Icon style={{ fontSize: 40, color: theme.appBar }} name="like1" type="AntDesign" />
              ) : (
                <Icon style={{ fontSize: 40, color: theme.appBar }} name="dislike1" type="AntDesign" />
              )
            }

            <Text style={styles.fromText}> {t('reviewFrom')} {user}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.reviewBody}>
        <Text style={styles.reviewText}>
          {reviewText}
        </Text>
      </View>
      {/*<View style={styles.reviewFooter}>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Text style={styles.readFurtherLabel}>{t('readFurther').toUpperCase()}</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
};

export default compose(withTheme, withTranslation())(ReviewListItem);

import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import ReviewListItem from '../../components/review-list-item';
import NoResultsComponent from '../../components/no-results-component/no-results-component';
import AddReviewContainer from '../add-review-container/add-review-container';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  }
});

const EventReviewsView = (
  {
    reviews,
    isLoggedIn,
    handleAddNewReview,
    theme,
    isLoading,
    onRefresh,
    isPositive,
    onChangePositive,
    eventId,
    isReviewed,
    t
  }
) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={reviews}
        onRefresh={onRefresh}
        refreshing={isLoading}
        ListHeaderComponent={(isLoggedIn && !isReviewed) ? <AddReviewContainer eventId={eventId} refresh={onRefresh}/> : null}
        ListHeaderComponentStyle={{ borderBottomWidth: 1 }}
        ListEmptyComponent={(isLoggedIn && !isReviewed) ? (
            <NoResultsComponent description={t('noReviews')}/>
          ) : (
            <NoResultsComponent description={t('noReviewsWithAdd')}/>
          )
        }
        style={styles.root}
        renderItem={({ item }) => {
          const date = new Date(parseInt(item.ts, 10) * 1000);
          return (
            <ReviewListItem
              key={item.id}
              title={'Lorem ipsum'}
              rating={item.is_positive}
              user={item.author}
              date={date.toLocaleDateString()}
              reviewText={item.review}
            />
          );
        }}
      />

      {/*{isLoggedIn ? (*/}
      {/*  <Fab*/}
      {/*    active*/}
      {/*    containerStyle={{}}*/}
      {/*    style={{ backgroundColor: theme.accentColor }}*/}
      {/*    position="bottomRight"*/}
      {/*    onPress={handleAddNewReview}*/}
      {/*  >*/}
      {/*    <Icon name="message-text" type="MaterialCommunityIcons"/>*/}
      {/*  </Fab>*/}
      {/*) : null}*/}
    </View>
  );
};

export default compose(withTheme, withTranslation())(EventReviewsView);

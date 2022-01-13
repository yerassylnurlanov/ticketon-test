import React from 'react';
import {
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import StarRatingRN from 'react-native-star-rating';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  starContainer: {
    marginVertical: 16,
    justifyContent: 'flex-start'
  },
});

const StarRating = (
  {
    theme,
    rating,
    maxRating
  }
) => {
  const styles = getStyles(theme);

  return (
    <StarRatingRN
      disabled
      containerStyle={styles.starContainer}
      starSize={10}
      fullStarColor={theme.appBar}
      maxStars={maxRating}
      rating={rating}
    />
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired
};

export default withTheme(StarRating);

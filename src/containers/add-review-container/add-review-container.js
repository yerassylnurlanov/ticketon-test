import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Toast, Icon } from 'native-base';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import EventsService from '../../services/events-service';
import StarRating from 'react-native-star-rating';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  starContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class AddReviewContainer extends React.Component {
  state = {
    rating: 5,
    isPositive: true,
    reviewText: ""
  };

  componentDidMount() {
    const { navigation } = this.props;
    const eventId = navigation.getParam('id');
    const authToken = navigation.getParam('authToken');
    navigation.setParams({ submitReview: this.handleSubmitReview });
  }

  handleReviewTextChange = (text) => {
    this.setState({
      reviewText: text
    });
    this.props.navigation.setParams({ reviewText: text });
  }

  onStarRatingPress = (rating) => {
    this.setState({
      rating
    });
  };

  handleSubmitReview = () => {
    const { navigation, t, eventId, authData, refresh } = this.props;
    const authToken = (authData) ? authData.token : null;
    const { reviewText, rating } = this.state;

    if (reviewText.length < 5) {
      Toast.show({
        text: t('tooShortReview'),
        duration: 3000
      });
      return;
    }
    EventsService.addReview(eventId, (rating > 5) ? 1 : 0, reviewText, authToken)
      .then(res => {
        refresh();
      })
      .catch(err => {
        Toast.show({
          text: t(err.message),
          duration: 3000
        });
      });
    EventsService.rateFilm(eventId, rating, authToken)
      .then(res => {
      })
      .catch(err => {

      });
  };

  dissmissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const {
      theme,
      t
    } = this.props;

    const {
      reviewText,
      rating,
      isPositive
    } = this.state;
    const styles = getStyles(theme);

    return (
      <TouchableWithoutFeedback style={styles.root} onPress={this.dissmissKeyboard}>
        <View>
          <View style={styles.header}>
          </View>
          <View>
            <StarRating
              rating={rating}
              fullStarColor={theme.appBar}
              containerStyle={{ margin: 4, marginTop: 16 }}
              maxStars={10}
              starSize={33}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={{ marginHorizontal: 16, flex: 4 }}>
            <TextInput
              placeholderTextColor="grey"
              style={{
                color: 'black',
                borderRadius: 4,
                marginVertical: 16,
                borderWidth: 0.3,
                paddingVertical: 8
              }}
              placeholder={t('review')}
              value={reviewText}
              multiline={true}
              onChangeText={(reviewText) => {
                this.setState({ reviewText });
                this.props.navigation.setParams({ reviewText });
              }}
              numberOfLines={10}
            />
            <Text>{reviewText.length}/300</Text>
          </View>
          <TouchableOpacity
            onPress={this.handleSubmitReview}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: theme.appBar, margin: 8, borderRadius: 8}}
          >
            <Text style={{ color: 'white'}}>{t('add')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    language: app.language,
    authData: state.auth.authData
  };
};

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation(),
  withTheme
)(AddReviewContainer);

import React from 'react';
import { Modal, Text, StatusBar, View, TouchableHighlight } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import ImageViewer from 'react-native-image-zoom-viewer';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { withTranslation } from 'react-i18next';
import { getEventsByCategory } from '../../store/actions/events-actions';
import EventSessionsView from './event-sessions-view';
import EventDescriptionView from './event-description-view';
import EventReviewsView from './event-reviews-view';
import EventsService from '../../services/events-service';
import withTheme from '../../hoc/withTheme';
import Spinner from '../../components/spinner';
import { Tab, Tabs, Header, Right, Button } from 'native-base';
import { serverURL, ticketon } from '../../consts/urls';
import ErrorComponent from '../../components/error-component';
import SubscribeModal from '../../components/subscribe-modal';
import Axios from 'axios';
import qs from 'qs';

class EventContainer extends React.Component {
  state = {
    isLoadingSessions: true,
    isLoadingReviews: true,
    isReviewError: false,
    isSessionError: false,
    selectedSessionType: null,
    selectedSessionDate: null,
    sessions: [],
    reviews: [],
    days: [],
    modalVisible: false,
    subscribeModalVisible: false,
    imageIndex: 0,
    activePage: 1,
    newReviewText: '',
    newReviewRating: '',
    newReviewIsPositive: false,
    //Subscribe modal
    subscribeEmail: '',
    subscribePhoneNumber: '',
  };

  componentDidMount() {
    this.handleSessionTypeChange('place');
    this.handleLoadReviews();

    const { event, eventPassed } = this.props;
    analytics().logEvent('view_item', {
      item_id: (!eventPassed) ? event.id : eventPassed.id
    });
  }

  handleEventSelectSession = (uid) => {
    const { navigation } = this.props;
    navigation.navigate('Seats', { sessionId: uid });
  };

  handleSubscribe = () => {
    const {
      eventPassed,
      event,
    } = this.props;

    const { sessions } = this.state;
    let renderEvent;
    if (eventPassed === undefined) {
      renderEvent = event;
    } else {
      renderEvent = eventPassed;
    }

    if (renderEvent.comingSoon) {
      this.setState({
        subscribeModalVisible: true
      });
    }
  };

  selectSessionsTab = () => {
    const {
      eventPassed,
      event,
      navigation
    } = this.props;

    const { sessions } = this.state;
    let renderEvent;
    if (eventPassed === undefined) {
      renderEvent = event;
    } else {
      renderEvent = eventPassed;
    }

    if (renderEvent.event_hide_date) {
      navigation.navigate('Seats', { sessionId: sessions.places[0].sessions[0].id });
    } else {
      this._tabbar.goToPage(1);
    }
  };

  handleSelectImage = (index) => {
    this.setState({ imageIndex: index, modalVisible: true });
  };

  handleSessionDateChange = (date) => {
    this.setState({ selectedSessionDate: date });
  };

  handleSessionTypeChange = (type) => {
    this.setState({ selectedSessionType: type }, () => {
      this.handleLoadSessions();
    });
  };

  handleCloseImageModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleLoadSessions = () => {
    const {
      event,
      language,
      selectedCity,
      eventPassed
    } = this.props;
    const { selectedSessionType } = this.state;
    this.setState({
      isLoadingSessions: true
    });
    const id = (event !== undefined && event !== null) ? event.event_id : eventPassed.event_id;
    EventsService.getEventSessions(id, language, selectedCity, selectedSessionType)
    .then(res => {
      this.setState({
        sessions: res.data,
        isLoadingSessions: false
      });
    })
    .catch(err => {
      this.setState({
        isSessionError: err.message,
        isLoadingSessions: false
      });
    });
  };

  handleAddReview = () => {
    const {
      navigation,
      event,
      eventPassed,
      authToken
    } = this.props;
    const id = (event !== undefined && event !== null) ? event.event_id : eventPassed.event_id;
    navigation.navigate('AddReview', { id, authToken });
  };

  handleLoadReviews = () => {
    const {
      event,
      eventPassed,
      authToken
    } = this.props;
    const id = (event !== undefined && event !== null) ? event.event_id : eventPassed.event_id;
    this.setState({
      isLoadingReviews: true
    });
    EventsService.getEventReviews(id, 0, 100, authToken)
    .then(res => {
      this.setState({
        isReviewed: res.data.isReviewed,
        reviews: res.data.list,
        isLoadingReviews: false
      });
    })
    .catch(err => {
      this.setState({
        isReviewError: err.message,
        isLoadingReviews: false
      });
    });
  };

  handleChangePositive = (value) => {
    this.setState({
      newReviewIsPositive: value
    });
  };

  handleSubscriptionSubmit = (eventId, email, phoneNumber) => {
    Axios.post(`${serverURL}/set_event_reminder`, qs.stringify({
      event: eventId,
      email,
      phone: phoneNumber
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      this.setState({
        subscribeModalVisible: false
      });
    })
    .catch(err => {
      console.error(err);
    })
  };

  handleRefunds = () => {
    const { navigation } = this.props;
    navigation.navigate('RefundsForm');
  }

  render() {
    const {
      event,
      t,
      theme,
      eventPassed,
      isLoggedIn,
      category,
      email,
    } = this.props;

    const {
      selectedSessionType,
      selectedSessionDate,
      sessions,
      reviews,
      isLoadingReviews,
      isLoadingSessions,
      newReviewIsPositive,
      isReviewed,
      isReviewError,
      isSessionError
    } = this.state;

    let renderEvent;
    if (eventPassed === undefined) {
      renderEvent = event;
    } else {
      renderEvent = eventPassed;
    }

    // if (isLoadingSessions) {
    //   return <Spinner/>
    // }

    // console.log(renderEvent);

    const id = renderEvent.event_id;

    const sessionsTab = (isSessionError) ? <ErrorComponent errorText={isSessionError}/> : (!isLoadingSessions) ? (
      <EventSessionsView
        isLoading={isLoadingSessions}
        onRefresh={this.handleLoadSessions}
        handleEventSelectSession={this.handleEventSelectSession}
        sessions={sessions}
        dates={[
          { label: t('today'), value: 'today' },
          { label: t('tomorrow'), value: 'tomorrow' }
        ]}
        types={[
          { label: t('sortByCinema'), value: 'place' },
          { label: t('sortByTime'), value: 'time' }
        ]}
        onDateChange={this.handleSessionDateChange}
        onTypeChange={this.handleSessionTypeChange}
        selectedDate={selectedSessionDate}
        selectedType={selectedSessionType}
      />
    ) : (<Spinner/>);

    const descriptionTab = (
      <EventDescriptionView
        handleRefunds={this.handleRefunds}
        handleBuy={this.selectSessionsTab}
        handleSubscribe={this.handleSubscribe}
        handleSelectImage={this.handleSelectImage}
        event={renderEvent}
        handleDonation={this.handleDonation}
      />
    );

    const reviewsTab = (isReviewError) ? <ErrorComponent errorText={isReviewError}/> : (
      <EventReviewsView
        isReviewed={isReviewed}
        eventId={id}
        onRefresh={this.handleLoadReviews}
        isPositive={newReviewIsPositive}
        onChangePositive={this.handleChangePositive}
        isLoading={isLoadingReviews}
        isLoggedIn={isLoggedIn}
        reviews={reviews}
        handleAddNewReview={this.handleAddReview}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        <SubscribeModal
          email={email}
          eventId={id}
          isVisible={this.state.subscribeModalVisible}
          onClose={() => {
            this.setState({
              subscribeModalVisible: false
            });
          }}
          onSubmit={this.handleSubscriptionSubmit}
        />
        <Tabs
          locked={false}
          tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
          ref={component => this._tabbar = component}
        >
          <Tab
            heading={t('description')}
            textStyle={{ color: theme.fontMain }}
            activeTextStyle={{ color: theme.headerBarTint }}
            tabStyle={{ backgroundColor: theme.appBar }}
            activeTabStyle={{ backgroundColor: theme.appBar }}
          >
            {descriptionTab}
            <StatusBar backgroundColor={theme.appBar} barStyle="light-content"/>
            <Modal
              presentationStyle="fullScreen"
              visible={this.state.modalVisible}
              transparent={true}
            >
              <StatusBar backgroundColor={theme.appBar} barStyle="light-content"/>
              <ImageViewer
                enableSwipeDown
                renderHeader={() => (
                  <Header style={{ backgroundColor: theme.appBar }}>
                    <Right>
                      <Button transparent onPress={this.handleCloseImageModal}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>{t('done')}</Text>
                      </Button>
                    </Right>
                  </Header>
                )}
                renderIndicator={() => null}
                loadingRender={() => (<Spinner/>)}
                onCancel={() => this.setState({ modalVisible: false })}
                backgroundColor="black"
                imageUrls={renderEvent.event_images.map(img => ({ url: ticketon + img }))}
              />
            </Modal>
          </Tab>
          {(renderEvent.event_hide_date !== 1 && !renderEvent.comingSoon) && (
            <Tab
              heading={t('sessions')}
              textStyle={{ color: theme.fontMain }}
              activeTextStyle={{ color: theme.headerBarTint }}
              tabStyle={{ backgroundColor: theme.appBar }}
              activeTabStyle={{ backgroundColor: theme.appBar }}
            >
              {sessionsTab}
            </Tab>
          )}
          <Tab
            heading={t('reviews')}
            textStyle={{ color: theme.fontMain }}
            activeTextStyle={{ color: theme.headerBarTint }}
            tabStyle={{ backgroundColor: theme.appBar }}
            activeTabStyle={{ backgroundColor: theme.appBar }}
          >
            {reviewsTab}
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { eventId, category } = ownProps;
  const event = (state.events.events[category] && state.events.events[category].eventsList !== null) ? state.events.events[category].eventsList.find(item => item.event_id === eventId) : null;
  return {
    event,
    isLoggedIn:
      (state.auth.authData !== null && state.auth.authData.token !== undefined),
    authToken: (state.auth.authData !== null) ? state.auth.authData.token : null,
    email: (state.auth.email) ? state.auth.email : '',
    selectedCity: state.city.selectedCity,
    language: state.app.language,
    isLoading: state.events.isLoading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getEventsByCategory
}, dispatch);


export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation(),
  withNavigation
)
(EventContainer);

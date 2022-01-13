import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import HomeView from './home-view';
import { setFirstLaunchStatus } from '../../store/actions/app-actions';
import { getHomepage } from '../../store/actions/home-actions';
import Spinner from '../../components/spinner';
import { selectEventCategory } from '../../store/actions/events-actions';
import { withTranslation } from 'react-i18next';
import OneSignal from 'react-native-onesignal';
import { onesignalKey } from '../../consts/keys';

class HomeContainer extends React.Component {
  state = {
    calendarVisible: false,
    currentDate: new Date(),
    isCityModalVisible: false,
    dateFrom: null,
    dateTo: null
  };

  componentDidMount() {
    const {
      setFirstLaunch,
      selectedCity,
      language,
      user,
      navigation
    } = this.props;

    navigation.setParams({
      onCalendarPressed: this.onCalendarPressed
    });
    setFirstLaunch(false);
    OneSignal.sendTags({
      city: selectedCity,
      language,
      userId: (user && user.userId) ? user.userId : ''
    });
    this.refresh();
  }

  constructor(props) {
    super(props);
    OneSignal.init(onesignalKey);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(0);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onCloseCalendar = () => {
    this.setState({
      calendarVisible: false
    });
  };

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    const { navigation } = this.props;
    if (openResult.notification.payload.additionalData) {
      if (openResult.notification.payload.additionalData.eventId && openResult.notification.payload.additionalData.eventId !== '') {
        navigation.navigate('Push', { id: openResult.notification.payload.additionalData.eventId });
      }
    }
  };

  onIds(device) {
    console.log('Device info: ', device);
  }

  onOpenCityModal = () => {
    this.setState({
      isCityModalVisible: true
    });
  };

  onCloseCityModal = () => {
    this.setState({
      isCityModalVisible: false
    });
  };

  onCalendarPressed = () => {
    this.setState({
      calendarVisible: !this.state.calendarVisible
    });
  };

  onSubmitCalendar = (beginDate, endDate) => {
    const dateFrom = new Date(beginDate).getTime() / 1000;
    const dateTo = new Date(endDate).getTime() / 1000;



    this.setState({
      calendarVisible: false,
      dateFrom,
      dateTo
    }, () => {
      this.refresh();
    });
  };


  refresh = () => {
    const { dateFrom, dateTo } = this.state;
    const {
      getHomepageData,
      selectedCity,
      language
    } = this.props;

    getHomepageData(language, selectedCity, dateFrom, dateTo);
  };

  handleEventSelect = (event) => {
    const { navigation } = this.props;
    navigation.navigate('Push', {
      id: event.event_id,
      title: event.event_name,
      eventPassed: (event.event)? event.event : event,
    });
  };

  handleSliderSelect = (slide) => {
    const { navigation } = this.props;
    navigation.navigate('SliderWebView', {
      slide
    });
  };

  handleCategorySelect = (key) => {
    const { selectEventCategory, navigation } = this.props;
    selectEventCategory(key);
    navigation.navigate('Events', { category: key });
  };

  handleTicketonLiveMore = () => {
    const { navigation } = this.props;
    navigation.navigate('TicketonLive');
  };

  render() {
    const { home, t, language, selectedCity, cities } = this.props;
    const { calendarVisible, currentDate, isCityModalVisible } = this.state;
    if (home.isLoading) {
      return <Spinner />;
    }
    return (
      <HomeView
        selectedCity={selectedCity}
        cities={cities}
        isCityModalVisible={isCityModalVisible}
        onOpenCityModal={this.onOpenCityModal}
        onCloseCityModal={this.onCloseCityModal}
        currentDate={currentDate}
        onCloseCalendar={this.onCloseCalendar}
        lang={language}
        error={home.error}
        {...home.data}
        handleTicketonLiveMore={this.handleTicketonLiveMore}
        handleEventSelect={this.handleEventSelect}
        handleSliderSelect={this.handleSliderSelect}
        handleCategorySelect={this.handleCategorySelect}
        onRefresh={this.refresh}
        isLoading={home.isLoading}
        calendarVisible={calendarVisible}
        onSubmitCalendar={this.onSubmitCalendar}
      />
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  selectedCity: state.city.selectedCity,
  cities: state.city.cities,
  language: state.app.language,
  user: state.auth.authData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setFirstLaunch: setFirstLaunchStatus,
  getHomepageData: getHomepage,
  selectEventCategory
}, dispatch);

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(HomeContainer);

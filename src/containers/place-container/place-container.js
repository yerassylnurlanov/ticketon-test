import React from 'react';
import { View, Modal, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { getPlaceSessions, setSortType } from '../../store/actions/place-actions';
import PlaceView from './place-view';
import Spinner from '../../components/spinner';
import { withNavigation } from 'react-navigation';
import SessionPicker from '../../components/session-picker/session-picker';
import { withTranslation } from 'react-i18next';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Button, Header, Right } from 'native-base';
import { Text } from 'react-native';
import { mediaURL, ticketon } from '../../consts/urls';
import withTheme from '../../hoc/withTheme';
import { ThemeContext } from '../../components/theme-context';

class PlaceContainer extends React.Component {
  state = {
    selectedDate: null,
    modalVisible: false,
    contentHeight: 1
  };

  componentDidMount() {
    const {
      getPlaceSessions,
      place,
      language,
      sortType
    } = this.props;
    getPlaceSessions(place.place_id, language, sortType);
  }

  handleCloseImageModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleSortTypeChange = type => {
    const {
      setSortType,
      getPlaceSessions,
      place,
      language,
      sortType
    } = this.props;
    getPlaceSessions(place.place_id, language, type);
  };

  handleSortDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleSessionSelect = (sessionId) => {
    const { navigation } = this.props;
    navigation.navigate('Seats', { sessionId: sessionId });
  };

  handleSelectImage = (index) => {
    this.setState({ imageIndex: index, modalVisible: true });
  };

  updateHeight = (height) => {
    this.setState({
      contentHeight: height
    });
  }

  handleDonation = (placeId) => {
    const { navigation } = this.props;
    navigation.navigate('Donation', {
      placeId: placeId,
      name: '',
      email: '',
      phone: '',
      donationSum: 0,
      currency: 0
    });
  }

  render() {
    const {
      place,
      sessions,
      t,
      sortType,
      isLoadingSessions,
      errorSessions,
      theme
    } = this.props;

    const { selectedDate, contentHeight } = this.state;

    let types = [
      {
        value: 'event',
        label: t('byEvent')
      },
      {
        value: 'time',
        label: t('byTime')
      }
    ];
    let dates = [];

    // if (!isLoadingSessions) {
    //   types = [
    //     {
    //       value: 'event',
    //       label: t('byEvent')
    //     },
    //     {
    //       value: 'time',
    //       label: t('byTime')
    //     }
    //   ];
    //
    //   // if (sortType === 'time') {
    //   //   dates = Object.keys(sessions.days).map((day) => {
    //   //     const dateString = new Date(day * 1000);
    //   //     return { label: dateString.toDateString(), value: day };
    //   //   });
    //   // } else {
    //   //   dates = new Set();
    //   //   // sessions.events.forEach(event => event.sessions.forEach((session) => {
    //   //   //   const date = new Date(session.ts * 1000);
    //   //   //   dates.add(date.toLocaleDateString());
    //   //   // }));
    //   //
    //   //   dates = Array.from(dates);
    //   //   dates = dates.map(date => {
    //   //     return { label: date, value: date };
    //   //   });
    //   // }
    //   dates = [];
    // }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.appBar} barStyle="light-content" />
        <Modal
          visible={this.state.modalVisible}
          presentationStyle="fullScreen"
        >
          <StatusBar backgroundColor={theme.appBar} barStyle="light-content" />
          <ImageViewer
            enableSwipeDown
            renderHeader={() => (
              <Header style={{ backgroundColor: theme.appBar }}>
                <Right>
                  <Button transparent onPress={this.handleCloseImageModal}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'white'}}>{t('done')}</Text>
                  </Button>
                </Right>
              </Header>
            )}
            renderIndicator={() => null}
            loadingRender={() => (<Spinner />)}
            onCancel={() => this.setState({modalVisible: false})}
            backgroundColor="black"
            imageUrls={(place.images) ? place.images.map(img => ({ url: img })) : []}
          />
        </Modal>
        <PlaceView
          handleDonation={this.handleDonation}
          handleSelectImage={this.handleSelectImage}
          isLoadingSessions={isLoadingSessions}
          errorSessions={errorSessions}
          place={place}
          types={types}
          dates={dates}
          selectedType={sortType}
          selectedDate={selectedDate}
          sessions={sessions}
          handleSortTypeChange={this.handleSortTypeChange}
          sortType={sortType}
          handleSortDateChange={this.handleSortDateChange}
          sortDate="asdasd"
          handleSessionSelect={this.handleSessionSelect}
          height={contentHeight}
          updateHeight={this.updateHeight}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  place: state.places.selectedCategoryPlaces.places.filter(el => el.place_id === props.place_id)[0],
  language: state.app.language,
  sessions: state.place.sessions,
  isLoadingSessions: state.place.isLoading,
  errorSessions: state.place.error,
  sortType: state.place.sortType
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPlaceSessions,
  setSortType
}, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withTheme,
  withNavigation
)(PlaceContainer);

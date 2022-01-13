import React from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import UnboundSeatsItem from '../unbound-seats-item';
import Spinner from '../spinner';
import Axios from 'axios';
import UnboundSeats from '../unbound-seats';

const iosHtmlSector = require('../../assets/html/sectors_webview/index.html');
const iosHtmlSeats = require('../../assets/html/seats_webview/index.html')

class SeatsSelectorWebview extends React.Component {
  state = {
    isSector: false,
    selectedSector: null,
    isLoading: false,
    isLazy: false,
    lazySector: null,
    isLoadingLazy: false
  };

  handleSectorClick = (sector) => {
    const { navigation, t, theme, show, onSelectSector } = this.props;
    const level = show.hall.levels[sector];
    if (level.lazy_loading === 1) {
      this.setState({
        isLoadingLazy: true
      });
      Axios.get('https://widget.ticketon.kz/lazy_load',{
        params: {
          show: show.show.id,
          level: level.id,
          lang: 'ru'
        }
      })
      .then(res => {
        this.setState({
          isLazy: true,
          isLoadingLazy: false,
          lazySector: res.data.level
        });
      })
      .catch(err => console.error(err.message))
    }
    onSelectSector(show.hall.levels[sector].name);
    this.setState({
      isSector: true,
      selectedSector: sector,
      isLoading: true
    }, () => {
      setTimeout(()=> {
        this.setState({
          isLoading: false
        })
      }, 2000);
    });

    navigation.setParams({ backToSector: (
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 3, alignItems: 'center', justifyContent: 'flex-start' }} onPress={this.backToSector}>
          <Icon
            style={{
              color: 'white',
              padding: -1,
              marginRight: -5,
              marginLeft: (Platform.OS === 'ios') ? -1 : 16,
              fontSize: (Platform.OS === 'ios') ? 35 : 24,
              fontWeight: (Platform.OS === 'ios') ? '800' : '400'
            }}
            type="Ionicons"
            ios="chevron-back"
            android="arrow-back"
          />
          {(Platform.OS === 'ios') ? (<Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>{t('sectors')}</Text>) : null}
        </TouchableOpacity>
      )});
  };

  backToSector = () => {
    const { navigation, onSelectSector } = this.props;
    navigation.setParams({ backToSector: undefined });
    this.setState({
      isSector: false,
      selectedSector: null,
      isLoading: true
    }, () => {
      onSelectSector(null);
      setTimeout(()=> {
        this.setState({
          isLoading: false
        })
      }, 2000);
    });
  }

  render() {
    const {
      cinemaName,
      movieName,
      session,
      theme,
      t,
      sessionId,
      handleSeatClick,
      show,
      selectedSeats
    } = this.props;

    const {
      isSector,
      selectedSector,
      isLoading,
      isLazy,
      lazySector,
      isLoadingLazy
    } = this.state;

    if (!show.hall) {
      return (
        <View>
          <Text>No hall data :(</Text>
        </View>
      );
    }

    if (isLoading) {
      return <Spinner/>
    }

    if (Object.keys(show.hall.levels).length === 1 || isSector) {
      const html = (Platform.OS === 'ios') ? iosHtmlSeats : { uri: 'file:///android_asset/seats_webview/index.html'};
      let level = show.hall.levels[Object.keys(show.hall.levels).shift()];

      if (isSector) {
        level = show.hall.levels[selectedSector];
      }

      if (isLoadingLazy) {
        return <Spinner />
      }

      if (isLazy) {
        level = lazySector;
      }



      const jsonData = JSON.stringify(level);
      if (level.unbound_seats === 0) {
        return (
          <View style={{ flex: 1 }}>
            <WebView
              style={{ flex: 1 }}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={ html }
              injectedJavaScript={`window.TICKETON_LEVEL_DATA = ${jsonData}`}
              onMessage={(event) => {
                const seats = JSON.parse(event.nativeEvent.data);
                handleSeatClick(seats);
              }}
            />
          </View>
        );
      } else {
        return (
          <UnboundSeats
            selectedSeats={selectedSeats}
            handleSeatClick={handleSeatClick}
            level={level}
          />
        );
      }
    } else {
      const html = (Platform.OS === 'ios') ? iosHtmlSector : { uri: 'file:///android_asset/sectors_webview/index.html'};
      return (
        <View style={{ flex: 1 }}>
          <WebView
            source={html}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={`window.TICKETON_HALL_DATA = ${JSON.stringify(show.hall)}`}
            onMessage={
              (event) => {
                this.handleSectorClick(JSON.parse(event.nativeEvent.data));
                // Data example: 123 (level ID)
              }
            }/>
        </View>
      );
    }
  }
}

export default compose(withTheme, withTranslation(), withNavigation)(SeatsSelectorWebview);

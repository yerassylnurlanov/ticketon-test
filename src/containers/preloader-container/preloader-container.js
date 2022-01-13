import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import SHA1 from 'js-sha1';
import NetInfo from "@react-native-community/netinfo";

import {
  getFirstLaunchStatus,
  setLanguage as setLanguageAction
} from '../../store/actions/app-actions';
import {
  loadProfile as loadProfileAction
} from '../../store/actions/auth-actions';
import {
  selectCity as selectCityAction,
  getCityList as getCityListAction
} from '../../store/actions/city-actions';
import {
  appPublicKey,
  appSalt, onesignalKey,
  tokenSalt
} from '../../consts/keys';
import TokenService from '../../services/token-service';
import Spinner from '../../components/spinner';
import AsyncStorageService from '../../services/async-storage-service';
import ErrorIndicator from '../../components/error-indicator';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';
import OneSignal from 'react-native-onesignal';
import { PushContext } from '../../utils/push-context';
import NavigationService from '../../services/navigation-service';

const getAppToken = async (appKey, appSalt, tokenSalt) => {
  const hash = SHA1(appKey + appSalt);
  return TokenService.getTokenFromServer(appKey, hash)
    .then((key) => {
      const token = SHA1(tokenSalt + key.data.token);
      return token;
    })
    .catch(err => console.error(err));
};

class PreloaderContainer extends React.Component {
  state = {
    error: null
  }

  componentDidMount() {
    const {
      getFirstLaunch,
      selectCity,
      setLanguage,
      getCityList,
      loadProfile,
      isPush,
      navigation,
      t
    } = this.props;
    this.setState({
      error: null
    });

    if (this.context.isPush) {
      navigation.navigate('Push');
    }

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({
          error: 'connectToInternet'
        });
      } else {
        getAppToken(appPublicKey, appSalt, tokenSalt)
          .then(token => {
            TokenService.postTokenToMemory(token)
            AsyncStorageService.getLanguage()
              .then(lang => {
                console.log(lang);
                if (lang) {
                  setLanguage(lang);
                } else {
                  setLanguage('ru');
                }
                AsyncStorageService.getCity()
                  .then(city => {
                    getCityList(lang ? lang : "ru")
                    .then(() => {
                      selectCity(city ? city : "1");
                      getFirstLaunch();
                    });
                  })
                  .catch(err => {
                    this.setState({
                      error: err.message
                    });
                  });
              })
              .catch(err => {
                this.setState({
                  error: err.message
                });
              });
          })
          .catch(err => console.error(err));
        loadProfile();
      }
      if (!state.isInternetReachable) {
        // throw new Error('connectToInternet');
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {
      firstLaunch,
      isLoading,
      error,
      navigation
    } = this.props;
    if (error) {
      return;
    }

    if (prevProps.isLoading !== isLoading) {
      if (!isLoading) {
        if (firstLaunch === true) {
          navigation.navigate('ChooseLanguage');
        } else {
          navigation.navigate('Drawer');
        }
      }
    }
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorComponent errorText={error} />
    }
    return <Spinner />;
  }
}

PreloaderContainer.contextType = PushContext;

const mapStateToProps = (state) => {
  const { app } = state;
  return { ...app };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getFirstLaunch: getFirstLaunchStatus,
      selectCity: selectCityAction,
      setLanguage: setLanguageAction,
      getCityList: getCityListAction,
      loadProfile: loadProfileAction
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation,
  withTranslation()
)(PreloaderContainer);

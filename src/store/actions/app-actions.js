import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {
  GET_FIRST_LAUNCH_REQUEST,
  GET_FIRST_LAUNCH_SUCCESS,
  GET_FIRST_LAUNCH_ERROR,
  POST_FIRST_LAUNCH_REQUEST,
  POST_FIRST_LAUNCH_SUCCESS,
  POST_FIRST_LAUNCH_ERROR,
  SET_LANGUAGE,
  SET_THEME,
  GET_PIN_ENABLE_SUCCESS,
  GET_PIN_ENABLE_REQUEST,
  GET_PIN_ENABLE_ERROR,
  POST_PIN_ENABLE_SUCCESS,
  POST_PIN_ENABLE_REQUEST,
  POST_PIN_ENABLE_ERROR
} from '../action-types';
import moment from 'moment';
import 'moment/min/moment-with-locales'
import 'moment/locale/ru';
import 'moment/locale/en-ca';
import 'moment/locale/kk'
import AsyncStorageService from '../../services/async-storage-service';

const getFirstLaunchRequested = () => ({
  type: GET_FIRST_LAUNCH_REQUEST
});

const getFirstLaunchLoaded = firstLaunchStatus => ({
  type: GET_FIRST_LAUNCH_SUCCESS,
  payload: firstLaunchStatus
});

const getFirstLaunchError = error => ({
  type: GET_FIRST_LAUNCH_ERROR,
  error
});

const postFirstLaunchRequested = () => ({
  type: POST_FIRST_LAUNCH_REQUEST
});

const postFirstLaunchLoaded = status => ({
  type: POST_FIRST_LAUNCH_SUCCESS,
  payload: status
});

const postFirstLaunchError = error => ({
  type: POST_FIRST_LAUNCH_ERROR,
  error
});

export const setLanguage = (lang) => {
  i18n.changeLanguage(lang);
  console.log(lang);
  if (lang === 'kz') {
    console.log('Fuck')
    moment.locale('kk');
  } else {
    moment.locale(lang);
  }
  AsyncStorageService.saveLanguage(lang);
  return {
    type: SET_LANGUAGE,
    payload: lang
  };
};

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme
  };
};

export const getFirstLaunchStatus = () => (dispatch) => {
  dispatch(getFirstLaunchRequested());
  return AsyncStorage.getItem('@firstLaunchStatus')
    .then((data) => {
      if (data) {
        dispatch(getFirstLaunchLoaded(data));
      } else {
        dispatch(getFirstLaunchLoaded(true));
      }
    })
    .catch(err => dispatch(getFirstLaunchError(err.message)));
};

export const setFirstLaunchStatus = (status) => (dispatch) => {
  dispatch(postFirstLaunchRequested());
  return AsyncStorage.setItem('@firstLaunchStatus', status.toString())
    .then(() => dispatch(postFirstLaunchLoaded(status)))
    .catch(err => dispatch(postFirstLaunchError(err.message)));
};

export const setPinEnableRequest = (isEnable) => ({
  type: POST_PIN_ENABLE_REQUEST
});



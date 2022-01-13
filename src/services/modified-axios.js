import axios from 'axios';
import _ from 'lodash';
import * as i18n from '../localization/i18n';
import i18next from 'i18next';

import { Toast } from 'native-base';
import crashlytics from '@react-native-firebase/crashlytics';
import NetInfo from "@react-native-community/netinfo";

const modifiedAxios = axios.create();

modifiedAxios.interceptors.request.use((config) => {
  return NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        throw new Error('connectToInternet');
      }
      if (!state.isInternetReachable) {
        // throw new Error('connectToInternet');
      }
      return Promise.resolve(config);
    });
  },(error) => {
    return Promise.reject(error);
  }
);


modifiedAxios.interceptors.response.use((response) => {
  if (response.data.status === undefined) {
    return response;
  }
  if (response.data.status === 1) {
    response.data = response.data.data;
    return response;
  }

  Toast.show({
    text: i18next.t(response.data.error),
    duration: 3000
  });
  crashlytics().log(response.data.error);
  // firebase.crashlytics().recordError(code, response.data.error);

  throw new Error(response.data.error);
});

export default modifiedAxios;

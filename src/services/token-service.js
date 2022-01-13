import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {
  serverURL
} from '../consts/urls';

export default class TokenService {
  static getTokenFromServer = (key, hash, version = 2, id = 421, platform = Platform.OS) => Axios.get(`${serverURL}/token`, {
    params: {
      key,
      hash,
      version,
      id,
      platform
    }
  });

  static getTokenFromMemory = () => AsyncStorage.getItem('@token');

  static postTokenToMemory = token => AsyncStorage.setItem('@token', token);
}

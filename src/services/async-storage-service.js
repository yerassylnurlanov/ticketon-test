import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class AsyncStorageService {
  static saveCity = city => AsyncStorage.setItem('@city', city);
  static getCity = () => AsyncStorage.getItem('@city');
  static saveProfile = profile => AsyncStorage.setItem('@profile', profile);
  static getProfile = () => AsyncStorage.getItem('@profile');
  static saveLanguage = lang => AsyncStorage.setItem('@lang', lang);
  static getLanguage = () => AsyncStorage.getItem('@lang');
  static clear = () => AsyncStorage.clear();
  static getUsePin = async () => {
    const value = await AsyncStorage.getItem('@isUsePin');
    return value === '1';

  }
  static saveUsePin = async (isUsePin) => {
    await AsyncStorage.setItem('@isUsePin', isUsePin ? '1' : '0');
  }
  static getUserPin = async () => {
    const pin = await AsyncStorage.getItem('@UserPin');
    if (pin === '') return null;
    return pin;
  }
  static saveUserPin = async (pin) => {
    if (pin === null) {
      await AsyncStorage.setItem('@UserPin', '');
      await AsyncStorage.setItem('@isUsePin', '0');
    } else {
      await AsyncStorage.setItem('@UserPin', pin);
    }
  }
}

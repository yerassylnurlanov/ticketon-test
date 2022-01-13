import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class CategoriesService {
  static getCategories = (lang) => {
    return TokenService.getTokenFromMemory()
      .then(token => Axios.get(`${serverURL}/mobile_categories`, {
        params: {
          lang,
          full: 'no',
          token,
          version: apiVersion
        }
      }));
  }
}

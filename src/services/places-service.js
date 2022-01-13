import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class PlacesService {
  static getPlaces = (type, city, lang) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_places`,{
          params: {
            type,
            city,
            lang,
            full: 'no',
            reset: 0,
            token,
            version: apiVersion
          }
        });
      });
  }
}

import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class PlaceService {
  static getPlaceSessions = (placeId, lang, sort) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_places/sessions`, {
          params: {
            place_id: placeId,
            lang,
            full: 'yes',
            reset: 0,
            token,
            sort,
            version: apiVersion
          }
        });
      });
  }
}

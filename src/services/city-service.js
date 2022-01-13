import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

class CityService {
  static getCities = (lang) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_cities`, {
          params: {
            lang,
            token,
          }
        });
      });
  };
}

export default CityService;

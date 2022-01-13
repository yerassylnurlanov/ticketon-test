// import Axios from 'axios';
import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class HomePageService {
  static getHomePage = (lang, city, dateFrom, dateTo) => {
    console.log(dateFrom);
    console.log(dateTo);

    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_homepage`, {
          params: {
            city,
            lang,
            version: apiVersion,
            reset: 0,
            token,
            dateFrom,
            dateTo
          }
        });
      })
  }
};

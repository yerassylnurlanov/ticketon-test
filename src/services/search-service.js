import Axios from './modified-axios';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class SearchService {
  static search = (q, lang) => Axios.get(`${serverURL}/search`,{
    params: {
      lang,
      q,
      version: apiVersion
    }
  });
}

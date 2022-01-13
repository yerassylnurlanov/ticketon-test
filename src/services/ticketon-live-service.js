import Axios from './modified-axios';
import { serverURL } from '../consts/urls';

export default class TicketonLiveService {
  static getData = (offset = 0, count = 10) => {
    return Axios.get(`${serverURL}/ticketon_live`, {
      params: {
        offset,
        count
      }
    });
  }
}

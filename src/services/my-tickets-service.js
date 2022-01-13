import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class MyTicketsService {
  static getTickets = (token) => {
    return Axios.get(`${serverURL}/get_tickets`, {
      params: {
        version: apiVersion
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
}

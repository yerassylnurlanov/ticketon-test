import Axios from './modified-axios';

export default class SeatService {
  static getSeats = (show, date, lang) => Axios.get('https://widget.ticketon.kz/show', {
    params: {
      show,
      date,
      lang,
    }
  });
};

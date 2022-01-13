import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';
import qs from 'qs';

export default class EventsService {
  static getEventsCategories = (lang) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_categories`,{
          params: {
            lang,
            full: 'no',
            token,
            version: apiVersion
          }
        });
      });
  };

  static getEvents = (type, city, lang, offset, count) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_events`,{
          params: {
            type,
            lang,
            city,
            offset,
            count,
            full: 'no',
            reset: 0,
            token,
            version: apiVersion
          }
        });
      });
  };

  static getEventById = (id, city, lang) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        console.log(
          {
            id,
            city,
            lang,
            token,
            reset: 0,
            version: apiVersion
          }
        );
        return Axios.get(`${serverURL}/mobile_event`, {
          params: {
            id,
            city,
            lang,
            token,
            reset: 0,
            version: apiVersion
          }
        })
      })
  }

  static getEventSessions = (filmId, lang, city, sortType) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_events/sessions`,{
          params: {
            film_id: filmId,
            lang,
            city,
            sort: sortType,
            full: 'no',
            reset: 0,
            token,
            version: apiVersion
          }
        });
      });
  };

  static getEventReviews = (filmId, offset, count, bearerToken) => {
    let token = null;
    if (bearerToken) {
      token = `Bearer ${bearerToken}`;
    }
    return Axios.get(`${serverURL}/get_film_reviews`,
      {
        params: {
          film_id: filmId,
          offset,
          count,
          version: apiVersion
        },
        headers: {
          Authorization: token
        //   'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

  static addReview = (filmId, isPositive, review, bearerToken) => Axios.post(`${serverURL}/review_film`, qs.stringify({
    film_id: filmId,
    is_positive: isPositive,
    review: review
  }), {
    params: {
      version: apiVersion
    },
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  static rateFilm = (filmId, rating, bearerToken) => Axios.post(`${serverURL}/rate_film`,qs.stringify({
    film_id: filmId,
    rating
  }), {
    params: {
      version: apiVersion
    },
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

}

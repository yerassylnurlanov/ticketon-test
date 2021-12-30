import {
  GET_HOMEPAGE_REQUESTED,
  GET_HOMEPAGE_SUCCESS,
  GET_HOMEPAGE_ERROR
} from '../action-types';
import HomePageService from '../../services/homepage-service';

const getHomepageRequested = () => ({
  type: GET_HOMEPAGE_REQUESTED
});

const getHomepageLoaded = data => ({
  type: GET_HOMEPAGE_SUCCESS,
  payload: data
});

const getHomepageError = error => ({
  type: GET_HOMEPAGE_ERROR,
  error
});

export function getHomepage(lang, city, dateFrom, dateTo) {
  return function (dispatch) {
    dispatch(getHomepageRequested());
    HomePageService.getHomePage(lang, city, dateFrom, dateTo)
      .then(res => {
        dispatch(getHomepageLoaded(res.data));
      })
      .catch(err => dispatch(getHomepageError(err.message)));
  };
}

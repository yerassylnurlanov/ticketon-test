import {
  CITY_FETCH,
  CITY_SUCCESS,
  CITY_ERROR,
  SELECT_CITY
} from '../action-types';
import CityService from '../../services/city-service';
import AsyncStorageService from '../../services/async-storage-service';

const getCityRequested = () => ({
  type: CITY_FETCH
});

const getCityLoaded = cities => ({
  type: CITY_SUCCESS,
  payload: cities
});

const getCityError = error => ({
  type: CITY_ERROR,
  error
});

export function getCityList(lang) {
  return function (dispatch) {
    dispatch(getCityRequested());
    return CityService.getCities(lang)
      .then(res => dispatch(getCityLoaded(res.data.cities)))
      .catch(err => dispatch(getCityError(err.message)));
  };
}

export function selectCity(id) {
  return {
    type: SELECT_CITY,
    payload: id
  };
}

export const selectCityAndSave = (id) => dispatch => {
  dispatch(selectCity(id));
  return AsyncStorageService.saveCity(id);
}

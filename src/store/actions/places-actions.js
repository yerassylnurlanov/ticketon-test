import {
  GET_PLACES_ERROR,
  GET_PLACES_SUCCESS,
  GET_PLACES_REQUESTED,
  SET_SELECTED_CATEGORY
} from '../action-types/places-action-types';
import {
  getCategoriesRequested,
  getCategoriesLoaded,
  getCategoriesError
} from '../actions/categories-actions';

import PlacesService from '../../services/places-service';
import CategoriesService from '../../services/categories-service';

const getPlacesRequested = () => ({
  type: GET_PLACES_REQUESTED
});

const getPlacesLoaded = places => ({
  type: GET_PLACES_SUCCESS,
  payload: places
});

const getPlacesError = error => ({
  type: GET_PLACES_ERROR,
  error
});

const setSelectedCategory = category => ({
  type: SET_SELECTED_CATEGORY,
  payload: category
});

export const getCategoriesAndPlaces = (city, lang) => (dispatch) => {
  dispatch(getCategoriesRequested());
  CategoriesService.getCategories(lang)
    .then(categories => {
      dispatch(setSelectedCategory(categories.data[0].key));
      dispatch(getPlacesRequested());
      PlacesService.getPlaces(categories.data[0].key, city, lang)
        .then(places => {
          dispatch(getPlacesLoaded(places.data));
          dispatch(getCategoriesLoaded(categories.data));
        })
        .catch(err => dispatch(getPlacesError(err.message)));
    })
    .catch(err => {
      dispatch(getCategoriesError(err.message));
    });
};


export const getPlaces = (type, city, lang) => (dispatch) => {
  dispatch(setSelectedCategory(type));
  dispatch(getPlacesRequested());
  PlacesService.getPlaces(type, city, lang)
    .then((res) => {
      dispatch(getPlacesLoaded(res.data));
    })
    .catch(err => dispatch(getPlacesError(err.message)));
};

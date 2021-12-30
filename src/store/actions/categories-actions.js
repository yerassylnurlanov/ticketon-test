import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUESTED,
  SET_SELECTED_CATEGORY
} from '../action-types/categories-action-types';

import CategoriesService from '../../services/categories-service';

export const getCategoriesRequested = () => ({
  type: GET_CATEGORIES_REQUESTED
});

export const getCategoriesLoaded = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories
});

export const getCategoriesError = error => ({
  type: GET_CATEGORIES_ERROR,
  error
});

export const getCategories = (lang) => (dispatch) => {
  dispatch(getCategoriesRequested());
  return CategoriesService.getCategories(lang)
    .then(res => dispatch(getCategoriesLoaded(res.data)))
    .catch(err => dispatch(getCategoriesError(err.message)));
};

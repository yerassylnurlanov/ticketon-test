import {
  GET_CATEGORIES_REQUESTED,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR
} from '../action-types/categories-action-types';

const initalState = {
  isLoading: true,
  error: null,
  categories: []
};

export default function categories(state = initalState, action) {
  switch (action.type) {
    case GET_CATEGORIES_REQUESTED:
      return {
        isLoading: true,
        error: null,
        categories: []
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        error: null,
        categories: action.payload
      };
    case GET_CATEGORIES_ERROR:
      return {
        isLoading: false,
        error: action.error,
        categories: []
      };
    default:
      return state;
  }
}

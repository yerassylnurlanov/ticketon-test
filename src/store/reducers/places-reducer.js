import {
  GET_PLACES_REQUESTED,
  GET_PLACES_SUCCESS,
  GET_PLACES_ERROR,
  SET_SELECTED_CATEGORY
} from '../action-types/places-action-types';

const initialState = {
  isLoading: true,
  selectedCategoryPlaces: [],
  selectedCategory: null,
  error: null
};

export default function places(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES_REQUESTED:
      return {
        ...state,
        isLoading: true,
        selectedCategoryPlaces: [],
        error: null
      };
    case GET_PLACES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedCategoryPlaces: action.payload,
        error: null
      };
    case GET_PLACES_ERROR:
      return {
        ...state,
        isLoading: false,
        selectedCategoryPlaces: [],
        error: action.error
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    default:
      return state;
  }
};

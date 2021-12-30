import {
  SEARCH_ERROR,
  SEARCH_LOADED,
  SEARCH_REQUESTED
} from '../action-types/search-action-types';

const initialState = {
  isLoading: true,
  searchResults: null,
  error: null
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        isLoading: true,
        searchResults: null,
        error: null
      };
    case SEARCH_LOADED:
      return {
        isLoading: false,
        searchResults: action.payload,
        error: null
      };
    case SEARCH_ERROR:
      return {
        isLoading: false,
        searchResults: null,
        error: action.error
      };
    default:
      return state;
  }
}

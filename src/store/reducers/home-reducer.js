import {
  GET_HOMEPAGE_REQUESTED,
  GET_HOMEPAGE_SUCCESS,
  GET_HOMEPAGE_ERROR,
} from '../action-types';

const initialState = {
  isLoading: true,
  data: null,
  error: null
};


export default function home(state = initialState, action) {
  switch (action.type) {
    case GET_HOMEPAGE_REQUESTED:
      return {
        isLoading: true,
        data: null,
        error: null
      };
    case GET_HOMEPAGE_SUCCESS:
      return {
        isLoading: false,
        data: action.payload,
        error: null
      };
    case GET_HOMEPAGE_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

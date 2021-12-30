import {
  GET_SEATS_ERROR,
  GET_SEATS_LOADED,
  GET_SEATS_REQUESTED
} from '../action-types/seat-action-types';

const initialState = {
  isLoading: true,
  seats: null,
  error: null,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case GET_SEATS_REQUESTED:
      return {
        isLoading: true,
        seats: null,
        error: null,
      };
    case GET_SEATS_LOADED:
      return {
        isLoading: false,
        seats: action.payload,
        error: null
      };
    case GET_SEATS_ERROR:
      return {
        isLoading: false,
        seats: null,
        error: action.error
      };
    default:
      return state;
  }
}

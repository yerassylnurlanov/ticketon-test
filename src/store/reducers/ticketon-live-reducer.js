import {
  GET_TICKETON_LIVE_ENTRIES_REQUEST,
  GET_TICKETON_LIVE_ENTRIES_SUCCESS,
  GET_TICKETON_LIVE_ENTRIES_ERROR,
} from '../action-types';

const initialState = {
  isLoading: true,
  data: [],
  error: null
};

export default function ticketonLive(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETON_LIVE_ENTRIES_REQUEST:
      return {
        isLoading: true,
        data: null,
        error: null
      };
    case GET_TICKETON_LIVE_ENTRIES_SUCCESS:
      return {
        isLoading: false,
        data: action.payload,
        error: null
      };
    case GET_TICKETON_LIVE_ENTRIES_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

import {
  GET_PLACE_SESSIONS_REQUEST,
  GET_PLACE_SESSIONS_SUCCESS,
  GET_PLACE_SESSIONS_ERROR, SET_SORT_TYPE
} from '../action-types/place-action-types';

const initialState = {
  isLoading: true,
  sessions: null,
  sortType: 'time',
  error: null
};

export default function place(state = initialState, action) {
  switch (action.type) {
    case GET_PLACE_SESSIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        sessions: null,
        error: null
      };
    case GET_PLACE_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessions: action.payload,
        error: null
      };
    case GET_PLACE_SESSIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        sessions: null,
        error: action.error
      };
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      };
    default:
      return state;
  }
};

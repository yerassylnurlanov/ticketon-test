import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SET_EMAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  SET_PASSWORD, LOGOUT
} from '../action-types/auth-action-types';

const initialState = {
  loading: false,
  authData: null,
  email: '',
  profile: null,
  password: '',
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        authData: null,
        loading: true,
        error: null
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: null
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        authData: null,
        loading: false,
        error: action.error
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        profile: null
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        profile: action.payload
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        profile: null
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        email: '',
        password: '',
        error: null,
        profile: null,
        authData: null,
      };
    default:
      return state;
  }
}

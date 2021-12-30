import {
  GET_FIRST_LAUNCH_REQUEST,
  GET_FIRST_LAUNCH_SUCCESS,
  GET_FIRST_LAUNCH_ERROR,
  POST_FIRST_LAUNCH_REQUEST,
  POST_FIRST_LAUNCH_SUCCESS,
  POST_FIRST_LAUNCH_ERROR,
  SET_LANGUAGE,
  SET_THEME
} from '../action-types';
import {} from '@react-native-community/async-storage';


const initialState = {
  isLoading: null,
  firstLaunch: null,
  language: 'ru',
  theme: 'light',
  pin: null,
  enablePin: false,
  error: null
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case GET_FIRST_LAUNCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        firstLaunch: null,
        error: null
      };
    case GET_FIRST_LAUNCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        firstLaunch: action.payload,
        error: null
      };
    case GET_FIRST_LAUNCH_ERROR:
      return {
        ...state,
        isLoading: false,
        firstLaunch: null,
        error: action.error
      };
    case POST_FIRST_LAUNCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        firstLaunch: state.firstLaunch,
        error: null
      };
    case POST_FIRST_LAUNCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        firstLaunch: action.payload,
        error: null
      };
    case POST_FIRST_LAUNCH_ERROR:
      return {
        ...state,
        isLoading: false,
        firstLaunch: state.firstLaunch,
        error: action.error
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}

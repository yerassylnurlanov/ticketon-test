import {
  CITY_FETCH,
  CITY_SUCCESS,
  CITY_ERROR,
  SELECT_CITY
} from '../action-types';

const initialState = {
  isLoading: true,
  cities: [],
  selectedCity: null,
  error: null
};

export default function city(state = initialState, action) {
  switch (action.type) {
    case CITY_FETCH:
      return {
        ...state,
        isLoading: true,
        cities: [],
        error: null,
      };
    case CITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        selectedCity: action.payload[0].id,
        error: null,
      };
    case CITY_ERROR:
      return {
        ...state,
        isLoading: false,
        cities: [],
        error: action.error
      };
    case SELECT_CITY:
      return {
        ...state,
        selectedCity: action.payload
      };
    default:
      return state;
  }
}

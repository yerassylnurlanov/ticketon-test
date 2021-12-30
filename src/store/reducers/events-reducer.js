import {
  EVENTS_BY_CATEGORY_ERROR,
  EVENTS_BY_CATEGORY_REQUESTED,
  EVENTS_BY_CATEGORY_SUCCESS,
  SELECT_EVENT_CATEGORY
} from '../action-types/events-action-types';

const initialState = {
  events: {},
  selectedCategory: null
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case SELECT_EVENT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    case EVENTS_BY_CATEGORY_REQUESTED:
      return {
        ...state,
        events: {
          ...state.events,
          [action.category]: {
            isLoading: true,
            eventsList: [],
            error: null
          }
        }
      };
    case EVENTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        events: {
          ...state.events,
          [action.category]: {
            isLoading: false,
            eventsList: action.payload,
            error: null
          }
        }
      };
    case EVENTS_BY_CATEGORY_ERROR:
      return {
        ...state,
        events: {
          ...state.events,
          [action.category]: {
            isLoading: false,
            eventsList: [],
            error: action.error
          }
        }
      };
    default:
      return state;
  }
}

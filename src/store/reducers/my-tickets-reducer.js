import {
  GET_TICKETS_ERROR,
  GET_TICKETS_REQUESTED,
  GET_TICKETS_SUCCESS
} from '../action-types/my-tickets-action-types';

const initialState = {
  isLoading: true,
  tickets: null,
  error: null
};


export default function myTickets(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS_REQUESTED:
      return {
        isLoading: true,
        tickets: null,
        error: null
      };
    case GET_TICKETS_SUCCESS:
      return {
        isLoading: false,
        tickets: action.payload,
        error: null
      };
    case GET_TICKETS_ERROR:
      return {
        isLoading: false,
        tickets: null,
        error: action.error
      };
    default:
      return state;
  }
}

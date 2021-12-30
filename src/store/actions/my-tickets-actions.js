import {
  GET_TICKETS_SUCCESS,
  GET_TICKETS_REQUESTED,
  GET_TICKETS_ERROR
} from '../action-types/my-tickets-action-types';
import MyTicketsService from '../../services/my-tickets-service';

const getMyTicketsRequested = () => ({
  type: GET_TICKETS_REQUESTED
});

const getMyTicketsLoaded = data => ({
  type: GET_TICKETS_SUCCESS,
  payload: data
});

const getMyTicketsError = error => ({
  type: GET_TICKETS_ERROR,
  error
});

export const getMyTickets = (token) => (dispatch) => {
  dispatch(getMyTicketsRequested());
  return MyTicketsService.getTickets(token)
    .then(res => dispatch(getMyTicketsLoaded(res.data)))
    .catch(err => dispatch(getMyTicketsError(err.message)));
};

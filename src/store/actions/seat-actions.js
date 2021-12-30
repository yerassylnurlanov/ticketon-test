import {
  GET_SEATS_ERROR,
  GET_SEATS_LOADED,
  GET_SEATS_REQUESTED
} from '../action-types/seat-action-types';
import SeatService from '../../services/seat-service';

const getSeatsRequested = () => ({
  type: GET_SEATS_REQUESTED
});

const getSeatsLoaded = seats => ({
  type: GET_SEATS_LOADED,
  payload: seats
});

const getSeatsError = error => ({
  type: GET_SEATS_ERROR,
  error
});

export const getSeats = (show, date, lang) => (dispatch) => {
  dispatch(getSeatsRequested());
  return SeatService.getSeats(show, date, lang)
    .then(res => {
      if (res.data.error !== undefined) {
        throw new Error(res.data.error);
      } else {
        dispatch(getSeatsLoaded(res.data));
      }
    })
    .catch(err => {
      dispatch(getSeatsError(err.message));
    });

};

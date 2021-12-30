import {
  GET_TICKETON_LIVE_ENTRIES_REQUEST,
  GET_TICKETON_LIVE_ENTRIES_SUCCESS,
  GET_TICKETON_LIVE_ENTRIES_ERROR,
} from '../action-types';
import TicketonLiveService from '../../services/ticketon-live-service';

const getTicketonLiveRequested = () => ({
  type: GET_TICKETON_LIVE_ENTRIES_REQUEST
});

const getTicketonLiveLoaded = data => ({
  type: GET_TICKETON_LIVE_ENTRIES_SUCCESS,
  payload: data
});

const getTicketonLiveError = error => ({
  type: GET_TICKETON_LIVE_ENTRIES_ERROR,
  error
});

export function getTicketonLive(offset, count) {
  return function (dispatch) {
    dispatch(getTicketonLiveRequested());
    return TicketonLiveService.getData(offset, count)
      .then(res => dispatch(getTicketonLiveLoaded(res.data)))
      .catch(err => dispatch(getTicketonLiveError(err.message)));
  };
}

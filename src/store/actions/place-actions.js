import {
  GET_PLACE_SESSIONS_SUCCESS,
  GET_PLACE_SESSIONS_REQUEST,
  GET_PLACE_SESSIONS_ERROR,
  SET_SORT_TYPE
} from '../action-types/place-action-types';
import PlaceService from '../../services/place-service';

const getPlaceSessionsRequested = () => ({
  type: GET_PLACE_SESSIONS_REQUEST
});

const getPlaceSessionsLoaded = place => ({
  type: GET_PLACE_SESSIONS_SUCCESS,
  payload: place
});

const getPlaceSessionsError = error => ({
  type: GET_PLACE_SESSIONS_ERROR,
  error
});

export const setSortType = sortType => ({
  type: SET_SORT_TYPE,
  payload: sortType
});


export const getPlaceSessions = (placeId, lang, sort) => (dispatch) => {
  dispatch(setSortType(sort));
  dispatch(getPlaceSessionsRequested());
  return PlaceService.getPlaceSessions(placeId, lang, sort)
    .then(res => {
      dispatch(getPlaceSessionsLoaded(res.data));
    })
    .catch(err => dispatch(getPlaceSessionsError(err.message)));
};

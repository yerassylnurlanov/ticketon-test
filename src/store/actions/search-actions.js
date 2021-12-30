import {
  SEARCH_ERROR,
  SEARCH_LOADED,
  SEARCH_REQUESTED
} from '../action-types/search-action-types';
import SearchService from '../../services/search-service';

export const searchRequested = () => ({
  type: SEARCH_REQUESTED,
});

export const searchLoaded = data => ({
  type: SEARCH_LOADED,
  payload: data
});

export const searchError = error => ({
  type: SEARCH_ERROR,
  error
});

export const search = (q, lang) => (dispatch) =>{
  dispatch(searchRequested());
  SearchService.search(q, lang)
    .then((res) => {
      dispatch(searchLoaded(res.data));
    })
    .catch((err) => {
      dispatch(searchError(err.message));
    });
};

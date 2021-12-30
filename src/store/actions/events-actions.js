import {
  EVENT_CATEGORIES_ERROR,
  EVENT_CATEGORIES_SUCCESS,
  EVENT_CATEGORIES_REQUESTED,
  EVENTS_BY_CATEGORY_ERROR,
  EVENTS_BY_CATEGORY_SUCCESS,
  EVENTS_BY_CATEGORY_REQUESTED,
  SELECT_EVENT_CATEGORY,
  SET_EVENT_CATEGORY_INDEX
} from '../action-types/events-action-types';
import NetInfo from "@react-native-community/netinfo";
import {
  getCategoriesError,
  getCategoriesLoaded,
  getCategoriesRequested
} from '../actions/categories-actions';
import EventsService from '../../services/events-service';
import CategoriesService from '../../services/categories-service';

const getEventCategoriesRequested = () => ({
  type: EVENT_CATEGORIES_REQUESTED
});

const getEventCategoriesLoaded = categories => ({
  type: EVENT_CATEGORIES_SUCCESS,
  payload: categories
});

const getEventCategoriesError = error => ({
  type: EVENT_CATEGORIES_ERROR,
  error
});

const getEventByCategoryRequested = category => ({
  type: EVENTS_BY_CATEGORY_REQUESTED,
  category
});

const getEventByCategoryLoaded = (category, events) => ({
  type: EVENTS_BY_CATEGORY_SUCCESS,
  payload: events,
  category
});

const getEventByCategoryError = (category, error) => ({
  type: EVENTS_BY_CATEGORY_ERROR,
  category,
  error
});

export const selectEventCategory = (category) => ({
  type: SELECT_EVENT_CATEGORY,
  payload: category
});

export const selectCategoryIndex = (index) => ({
  type: SET_EVENT_CATEGORY_INDEX,
  payload: index
});

export const getEventsByCategory = (
  category,
  lang,
  city,
  offset,
  count
) => dispatch => {
  dispatch(getEventByCategoryRequested(category));
  return EventsService.getEvents(category, city, lang, offset, count)
    .then(res => {
      dispatch(getEventByCategoryLoaded(category, res.data.events));
    })
    .catch(err => dispatch(getEventByCategoryError(category, err)));
};

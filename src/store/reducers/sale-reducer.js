import {
  SALE_CONFIRM_ERROR,
  SALE_CONFIRM_REQUESTED,
  SALE_CONFIRM_SUCCESS,
  SALE_CREATE_ERROR,
  SALE_CREATE_REQUESTED,
  SALE_CREATE_SUCCESS
} from '../action-types/sale-action-types';

const initialState = {
  isLoading: true,
  createData: null,
  confirmData: null,
  error: null
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case SALE_CREATE_REQUESTED:
      return {
        ...state,
        isLoading: true,
        createData: null,
        error: null
      };
    case SALE_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createData: action.payload,
        error: null
      };
    case SALE_CREATE_ERROR:
      return {
        ...state,
        isLoading: false,
        createData: null,
        error: action.error
      };
    default:
      return state;
  }
}

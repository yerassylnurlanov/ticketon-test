import {
  SALE_CREATE_ERROR,
  SALE_CREATE_SUCCESS,
  SALE_CREATE_REQUESTED,
  SALE_CONFIRM_ERROR,
  SALE_CONFIRM_SUCCESS,
  SALE_CONFIRM_REQUESTED,
} from '../action-types/sale-action-types';
import SaleService from '../../services/sale-service';

const saleCreateRequested = () => ({
  type: SALE_CREATE_REQUESTED
});

const saleCreateLoaded = places => ({
  type: SALE_CREATE_SUCCESS,
  payload: places
});

const saleCreateError = error => ({
  type: SALE_CREATE_ERROR,
  error
});

export const saleCreate = (show, seats, lang, transmit) => (dispatch) => {
  dispatch(saleCreateRequested());
  return SaleService.saleCreate(show, seats, lang, transmit)
    .then(res => dispatch(saleCreateLoaded(res.data)))
    .catch(err => dispatch(saleCreateError(err.message)));
};

import qs from 'qs';
import Axios from './modified-axios';
import TokenService from './token-service';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class SaleService {
  static saleCreate = (show, seats = [], lang) => {
    return TokenService.getTokenFromMemory()
    .then((token) => {
      return Axios.get(`${serverURL}/sale_create`,{
        params: {
          token,
          show,
          seats,
          lang
        }
      });
    });
  };

  static acceptInsurance = (saleUid, price) => {
    return TokenService.getTokenFromMemory()
    .then((token) => {
      console.log(token, saleUid, price);
      return Axios.get(`${serverURL}/insurance_activate`, {
        params: {
          sale_uid: saleUid,
          token,
          price,
          version: apiVersion
        }
      })
    })
    .catch(err => console.error(err));
  }

  static saleCancel = (sale) => {
    return TokenService.getTokenFromMemory()
    .then((token) => Axios.get(`${serverURL}/sale_cancel`, {
      params: {
        sale,
        token
      }
    }));
  };

  static saleInsurance = (saleUuid) => {
    return TokenService.getTokenFromMemory()
    .then((token) => Axios.post(`${serverURL}/mobile_check_insurance`, {

    }, {
      params: {
        token: token,
        sale_uid: saleUuid,
        version: apiVersion
      }
    }))
    .catch(err => console.error(err));
  }

  static saleDiscount = (sale, email, phone, type, country, promo, lang, tlsUser) => {
    return TokenService.getTokenFromMemory()
      .then((token) => {
        return Axios.get(`${serverURL}/mobile_discount`, {
          params: {
            token,
            sale,
            email,
            phone,
            type,
            country,
            promo,
            lang,
            tlsUser,
            version: apiVersion
          },
          paramsSerializer: params => {
            return qs.stringify(params)
          }
        });
      });
  };
}

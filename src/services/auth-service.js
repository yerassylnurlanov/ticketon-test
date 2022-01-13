import Axios from './modified-axios';
import { serverURL } from '../consts/urls';
import { apiVersion } from '../consts';

export default class AuthService {
  static signUp = (nickname, password, email, phone, otp, otpToken) => {
    return Axios.post(
      `${serverURL}/sign_up`,
      {
        nickname,
        password,
        email,
        phone,
        otp,
        otpToken
      },
      {
        params: {
          version: apiVersion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  };

  static signIn = (login, password) => Axios.post(
    `${serverURL}/sign_in`,
    {
      login,
      password
    },
    {
      params: {
        version: apiVersion
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  static signInFb = token => Axios.post(
    `${serverURL}/sign_in_via_fb`,
    {
      token
    },
    {
      params: {
        version: apiVersion
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  static signOut = token => Axios.get(
    `${serverURL}/sign_out`,
    {
      params: {
        version: apiVersion
      },
      headers: {
        Authorization: token
      }
    }
  );

  static changePassword = (token, oldPassword, newPassword) => Axios.post(
    `${serverURL}/change_password`,
    {
      oldPassword,
      newPassword
    },
    {
      params: {
        version: apiVersion
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  static restorePassword = email => Axios.post(
    `${serverURL}/restore_password`,
    {
      email
    },
    {
      params: {
        version: apiVersion
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  static getProfile = token => Axios.get(
    `${serverURL}/get_profile`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  static editProfile = (
    firstName,
    lastName,
    middleName,
    country,
    city,
    about,
    gender,
    birthday,
    iin,
    token,
  ) => Axios.post(
    `${serverURL}/edit_profile`,
    {
      firstName,
      lastName,
      middleName,
      country,
      city,
      about,
      gender,
      birthday,
      iin
    },
    {
      params: {
        version: apiVersion
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

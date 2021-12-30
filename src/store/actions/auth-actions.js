import {
  SET_EMAIL,
  SET_PASSWORD,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  LOGOUT
} from '../action-types/auth-action-types';
import AuthService from '../../services/auth-service';
import { setLastName, setFirstName, setEmail as setEmailProfile, setMobilePhone, setAchievements } from './profile-actions';
import AsyncStorageService from '../../services/async-storage-service';
import OneSignal from 'react-native-onesignal';

export const setEmail = (email) => (dispatch) => {
  dispatch(
    {
      type: SET_EMAIL,
      payload: email.trim()
    }
  );
};

export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: password.trim()
});


//Sign up
const signUpRequested = () => ({
  type: SIGN_UP_REQUEST
});

const signUpLoaded = () => ({
  type: SIGN_UP_SUCCESS,
  // payload:
});

const signUpError = () => ({
  type: SIGN_UP_ERROR
});

//Sign in
const signInRequested = () => ({
  type: SIGN_IN_REQUEST
});

const signInLoaded = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data
});

const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  error
});

const getProfileRequested = () => ({
  type: GET_PROFILE_REQUEST
});

const getProfileLoaded = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile
});

const getProfileError = (error) => ({
  type: GET_PROFILE_ERROR,
  error
});

export const signUp = (email, password, nickname, phone) => (dispatch) => {

};

export const logOut = () => {
  AsyncStorageService.saveProfile('')
  .then(res => console.log(res))
  .catch(err => console.error(err));
  return {
    type: LOGOUT
  };
};

export const getProfile = (bearerToken) => (dispatch) => {
  dispatch(getProfileRequested());
  AuthService.getProfile(bearerToken)
    .then(res => {
      dispatch(getProfileLoaded(res.data));
    })
    .catch(err => dispatch(getProfileError(err.message)));
};

export const signIn = (email, password) => (dispatch) => {
  dispatch(signInRequested());
  AuthService.signIn(email.trim(), password.trim())
    .then((res) => {
      AsyncStorageService.saveProfile(JSON.stringify(res.data));
      dispatch(signInLoaded(res.data));
      dispatch(getProfileRequested());
      AuthService.getProfile(res.data.token)
        .then((response) => {
          dispatch(setFirstName(response.data.firstName));
          dispatch(setLastName(response.data.lastName));
          dispatch(setEmailProfile(response.data.email));
          dispatch(getProfileLoaded(response.data));
          // firebase.analytics().logEvent("login", { method: "email" });
        })
        .catch((err) => {
          dispatch(getProfileError(err.message));
        });
    })
    .catch(err => dispatch(signInError(err.message)));
};

export const signInFb = (token) => {
  return (dispatch) => {
    dispatch(signInRequested());
    AuthService.signInFb(token)
    .then((res) => {
      AsyncStorageService.saveProfile(JSON.stringify(res.data));
      dispatch(signInLoaded(res.data));
      dispatch(getProfileRequested());
      AuthService.getProfile(res.data.token)
      .then((response) => {
        dispatch(setFirstName(response.data.firstName));
        dispatch(setLastName(response.data.lastName));
        dispatch(setEmailProfile(response.data.email));
        dispatch(setAchievements(response.data.achievements));
        dispatch(getProfileLoaded(response.data));
        // firebase.analytics().logEvent("login", { method: "facebook" });
      })
      .catch((err) => {
        dispatch(getProfileError(err.message));
      });
    })
    .catch(err => dispatch(signInError(err.message)));
  };
};

export const loadProfile = () => (dispatch) => {
  dispatch(signInRequested());
  return AsyncStorageService.getProfile()
    .then(authData => {
      const data = JSON.parse(authData);
      if (data && data.expirationTs) {
        if (new Date(data.expirationTs * 1000) < new Date()) {
          dispatch(logOut());
          return;
        }
      }
      dispatch(signInLoaded(data));
      dispatch(getProfileRequested());
      AuthService.getProfile(data.token)
        .then((response) => {
          dispatch(setFirstName(response.data.firstName));
          dispatch(setLastName(response.data.lastName));
          dispatch(setEmailProfile(response.data.email));
          dispatch(setAchievements(response.data.achievements));
          dispatch(getProfileLoaded(response.data));
        })
        .catch((err) => {
          dispatch(getProfileError(err.message));
        });
    })
    .catch(err => dispatch(signInError(err.message)));
};

export const signInAndGetProfile = (email, password, token) => (dispatch) => {
  return dispatch(signIn(email, password))
    .then(()=>dispatch(getProfile(token)));
}

import {
  SET_EMAIL,
  SET_LASTNAME,
  SET_MOBILE_PHONE,
  SET_FIRSTNAME,
  SET_ACHIEVEMENTS,
  SET_LII,
  SET_BIRTHDAY,
  SET_GENDER,
  SET_COUNTRY,
  SET_CITY,
  SET_ABOUT, SET_PROFILE
} from '../action-types/profile-action-types';

export const setFirstName = firstName => ({
  type: SET_FIRSTNAME,
  payload: firstName
});

export const setLastName = lastName => ({
  type: SET_LASTNAME,
  payload: lastName
});

export const setMobilePhone = (mobilePhone) => ({
  type: SET_MOBILE_PHONE,
  payload: mobilePhone
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email
});

export const setAchievements = (achievements) => ({
  type: SET_ACHIEVEMENTS,
  payload: achievements
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile
});

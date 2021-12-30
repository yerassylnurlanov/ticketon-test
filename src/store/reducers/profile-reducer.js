import {
  SET_FIRSTNAME,
  SET_LASTNAME,
  SET_MOBILE_PHONE,
  SET_EMAIL,
  SET_ABOUT,
  SET_BIRTHDAY,
  SET_CITY,
  SET_COUNTRY,
  SET_GENDER,
  SET_LII,
  SET_ACHIEVEMENTS, SET_PROFILE
} from '../action-types/profile-action-types';

const initialState = {
  nickname: 'vvpak',
  firstName: 'Slava',
  lastName: 'Pak',
  mobilePhone: '87770300603',
  email: 'vvpak14@gmail.com',
  birthday: Date(),
  gender: 'male',
  lii: '',
  achievements: []
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case SET_FIRSTNAME:
      return {
        ...state,
        firstName: action.payload
      };
    case SET_LASTNAME:
      return {
        ...state,
        lastName: action.payload
      };
    case SET_MOBILE_PHONE:
      return {
        ...state,
        mobilePhone: action.payload
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_BIRTHDAY:
      return {
        ...state,
        birthday: action.payload
      };
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload
      };
    case SET_LII:
      return {
        ...state,
        lii: action.payload
      };
    case SET_ACHIEVEMENTS:
      return {
        ...state,
        achievements: action.payload
      };
    case SET_PROFILE:
      return action.payload;
    default:
      return state;
  }
}

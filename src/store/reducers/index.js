import {
  combineReducers
} from 'redux';
import token from './token-reducer';
import app from './app-reducer';
import home from './home-reducer';
import city from './city-reducer';
import ticketonLive from './ticketon-live-reducer';
import profile from './profile-reducer';
import events from './events-reducer';
import categories from './categories-reducer';
import places from './places-reducer';
import place from './place-reducer';
import auth from './auth-reducer';
import seats from './seat-reducer';
import search from './search-reducer';
import myTickets from './my-tickets-reducer';
import sale from './sale-reducer';

const rootReducer = combineReducers({
  app,
  token,
  auth,
  home,
  city,
  ticketonLive,
  profile,
  events,
  categories,
  places,
  place,
  seats,
  search,
  myTickets,
  sale
});

export default rootReducer;

import {combineReducers} from 'redux-immutable';
import {routerReducer} from 'react-router-redux';

import movieReducer from './movie/reducer/index';

export default combineReducers({
  routing: routerReducer,
  movieReducer
});

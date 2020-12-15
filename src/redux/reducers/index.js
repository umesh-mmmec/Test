/* eslint-disable no-param-reassign */
import utils from './utils';

import { combineReducers } from 'redux';
const appReducer = combineReducers({
  utils
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined; //clear all reducers state
  }
  return appReducer(state, action);
}

export default rootReducer;
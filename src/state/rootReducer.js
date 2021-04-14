import { combineReducers } from 'redux-immutable';
import admin from './modules/admin';
import error from './modules/error';
import example from './modules/example';

/**
 * Creates the root reducer with the asynchronously loaded ones
 */
export default function rootReducer(asyncReducers) {
  return combineReducers({
    example,
    admin,
    error,
    ...asyncReducers,
  });
}

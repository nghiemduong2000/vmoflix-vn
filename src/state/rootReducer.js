import { combineReducers } from 'redux-immutable';
import admin from './modules/admin';
import category from './modules/categories';
import error from './modules/error';
import example from './modules/example';
import user from './modules/user';

/**
 * Creates the root reducer with the asynchronously loaded ones
 */
export default function rootReducer(asyncReducers) {
  return combineReducers({
    example,
    admin,
    error,
    user,
    category,
    ...asyncReducers,
  });
}

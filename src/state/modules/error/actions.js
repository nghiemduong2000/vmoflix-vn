import { createAction } from 'redux-actions';
import types from './types';

const returnErrors = createAction(types.GET_ERRORS_SUCCESS);
const clearErrors = createAction(types.CLEAR_ERRORS_SUCCESS);

const actions = {
  returnErrors,
  clearErrors,
};

export default actions;

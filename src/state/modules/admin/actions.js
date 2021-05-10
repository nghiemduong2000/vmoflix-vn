import { authAdminApi, getAdminApi, logoutAdminApi } from 'apis/adminApi';
import { createAction } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { errorActions } from '../error';
import types from './types';

const { getErrors, clearErrors } = errorActions;

//= =============== ACTIONS ===============//
// Action Load Admin
const loadAdmin = createAction(types.LOAD_ADMIN);
const adminLoading = createAction(types.ADMIN_LOADING);
const adminLoaded = createAction(types.ADMIN_LOADED);
const authError = createAction(types.AUTH_ERROR);

// Action Login
const login = createAction(types.LOGIN);
const loginSuccess = createAction(types.LOGIN_SUCCESS);
const loginFail = createAction(types.LOGIN_FAIL);

// Action Logout
const logout = createAction(types.LOGOUT);
const logoutSuccess = createAction(types.LOGOUT_SUCCESS);

// EXPORT ACTION
export const actions = {
  loadAdmin,
  login,
  logout,
};

//= =============== SAGAS ===============//
function* loadAdminSaga() {
  try {
    yield put(adminLoading());
    const res = yield call(getAdminApi);
    yield put(adminLoaded(res.data));
  } catch (err) {
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: null,
      }),
    );
    yield put(authError());
  }
}

function* loginSaga(action) {
  try {
    const res = yield call(authAdminApi, action.payload);
    yield put(loginSuccess(res.data));
    yield put(clearErrors());
  } catch (err) {
    console.log(err);
    yield put(
      getErrors({
        msg: err.response.data,
        status: err.response.status,
        id: 'LOGIN_FAIL',
      }),
    );
    yield put(loginFail());
  }
}

function* logoutSaga() {
  try {
    yield call(logoutAdminApi);
    yield put(logoutSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* sagas() {
  yield takeEvery(types.LOAD_ADMIN, loadAdminSaga);
  yield takeEvery(types.LOGIN, loginSaga);
  yield takeEvery(types.LOGOUT, logoutSaga);
}

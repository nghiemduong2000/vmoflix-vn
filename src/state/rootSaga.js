import { all, fork } from 'redux-saga/effects';
import { adminSagas } from './modules/admin';
import { categoriesSagas } from './modules/categories';
import { errorSagas } from './modules/error';
import { exampleSagas } from './modules/example';
import { userSagas } from './modules/user';

export default function* rootSaga() {
  yield all([
    fork(exampleSagas),
    adminSagas(),
    errorSagas(),
    userSagas(),
    categoriesSagas(),
  ]);
}

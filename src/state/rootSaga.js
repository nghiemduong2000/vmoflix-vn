import { all, fork } from 'redux-saga/effects';
import { adminSagas } from './modules/admin';
import { exampleSagas } from './modules/example';
import { filmsSagas } from './modules/film';

export default function* rootSaga() {
  yield all([fork(exampleSagas), adminSagas(), filmsSagas()]);
}

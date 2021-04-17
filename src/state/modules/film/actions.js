import {
  addFilmApi,
  deleteFilmApi,
  getFilmApi,
  updateFilmApi,
} from 'apis/filmApi';
import { call, put, takeEvery } from 'redux-saga/effects';

const { createAction } = require('redux-actions');
const { default: types } = require('./types');

const loadFilms = createAction(types.LOAD_FILMS);
const loadFilmsSuccess = createAction(types.LOAD_FILMS_SUCCESS);

const addFilm = createAction(types.ADD_FILM);
const addFilmSuccess = createAction(types.ADD_FILM_SUCCESS);

const updateFilm = createAction(types.UPDATE_FILM);
const updateFilmSuccess = createAction(types.UPDATE_FILM_SUCCESS);

const deleteFilm = createAction(types.DELETE_FILM);
const deleteFilmSuccess = createAction(types.DELETE_FILM_SUCCESS);

export const actions = {
  loadFilms,
  addFilm,
  updateFilm,
  deleteFilm,
};

function* loadFilmsSaga() {
  try {
    const res = yield call(getFilmApi);
    const { data } = res;
    yield put(loadFilmsSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* addFilmSaga(action) {
  try {
    const data = action.payload;
    const res = yield call(addFilmApi, data);
    yield put(addFilmSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* updateFilmSaga(action) {
  try {
    const { id, data } = action.data;
    const res = yield call(updateFilmApi, id, data);
    yield put(updateFilmSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteFilmSaga(action) {
  try {
    const { id } = action;
    yield call(deleteFilmApi, id);
    yield put(deleteFilmSuccess(id));
  } catch (err) {
    console.log(err);
  }
}

export function* sagas() {
  yield takeEvery(types.LOAD_FILMS, loadFilmsSaga);
  yield takeEvery(types.ADD_FILM, addFilmSaga);
  yield takeEvery(types.UPDATE_FILM, updateFilmSaga);
  yield takeEvery(types.DELETE_FILM, deleteFilmSaga);
}

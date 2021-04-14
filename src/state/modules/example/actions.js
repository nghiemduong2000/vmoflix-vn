import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import types from './types';

// import handleError from '~/utils/ErrorHandler';

//= ============== ACTIONS ===============//
const load = createAction(types.LOAD_EXAMPLES);
const loadSuccess = createAction(types.LOAD_EXAMPLES_SUCCESS);
const loadFail = createAction(types.LOAD_EXAMPLES_FAIL);
const storeData = createAction(types.STORE_EXAMPLES);
const storePaginate = createAction(types.STORE_PAGINATE);

export const actions = {
  load,
};

//= =============== SAGAS ===============//
export function* sagas() {
  yield takeLatest(types.LOAD_EXAMPLES, fetchData);
}

function* fetchData({ payload }) {
  try {
    const exampleApi = {
      fetch: 1,
    };
    const { data: response } = yield call(exampleApi.fetch, payload);
    const { data, meta } = response;
    yield put(storeData(data));
    yield put(storePaginate(meta));
    yield put(loadSuccess());
  } catch (error) {
    // handleError(error);
    yield put(loadFail());
  }
}

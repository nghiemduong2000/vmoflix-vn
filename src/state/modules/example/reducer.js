import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import types from './types';

// import enums from '~/utils/enums';

//= ============== SELECTOR ===============//
const loadStatus = (state) => state.getIn(['example', 'loadStatus']);
const examples = (state) => state.getIn(['example', 'examples']);
const paginate = (state) => state.getIn(['example', 'paginate']);

export const selectors = {
  loadStatus,
  examples,
  paginate,
};

//= ============== REDUCER ===============//
const initState = fromJS({
  loadStatus: 'Loading',
  examples: [],
  paginate: {
    currentPage: 1,
    perPage: 1,
    total: 1,
  },
});

const loading = (state) => state.set('loadStatus', 'Loading');
const loadSuccess = (state) => state.set('loadStatus', 'Success');
const loadFail = (state) => state.set('loadStatus', 'Error');
const storeData = (state, action) =>
  state.set('examples', fromJS(action.payload));
const storePaginate = (state, action) =>
  state.set('paginate', fromJS(action.payload));

const reducer = handleActions(
  {
    [types.LOAD_EXAMPLES]: loading,
    [types.LOAD_EXAMPLES_SUCCESS]: loadSuccess,
    [types.LOAD_EXAMPLES_FAIL]: loadFail,
    [types.STORE_EXAMPLES]: storeData,
    [types.STORE_PAGINATE]: storePaginate,
  },
  initState,
);

export default reducer;

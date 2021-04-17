import { actions, sagas } from './actions';
import reducer, { selectors } from './reducer';
import types from './types';

export default reducer;

export {
  types as filmsTypes,
  sagas as filmsSagas,
  actions as filmsActions,
  selectors as filmsSelectors,
};

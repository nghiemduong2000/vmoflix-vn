const { fromJS } = require('immutable');
const { handleActions } = require('redux-actions');
const { default: types } = require('./types');

const films = (state) => state.getIn(['film', 'films']);
const loading = (state) => state.getIn(['film', 'loading']);
const errors = (state) => state.getIn(['film', 'errors']);

export const selectors = {
  films,
  loading,
  errors,
};

const initialState = fromJS({
  films: [],
  loading: true,
  errors: null,
});

const loadFilmsSuccess = (state, action) =>
  state.set('films', fromJS(action.payload)).set('loading', false);

const addFilmSuccess = (state, action) =>
  state.set('films', fromJS([action.payload, ...state.get('films')]));

const updateFilmSuccess = (state, action) => {
  const index = state
    .get('films')
    .findIndex((film) => film._id === action.payload._id);
  return state.set(
    'films',
    fromJS([
      ...state.get('films').toJS().slice(0, index),
      { ...action.payload },
      ...state
        .get('films')
        .toJS()
        .slice(index + 1),
    ]),
  );
};

const deleteFilmSuccess = (state, action) =>
  state.set(
    'films',
    fromJS(
      state
        .get('films')
        .toJS()
        .filter((film) => film._id !== action.payload),
    ),
  );

const reducer = handleActions(
  {
    [types.LOAD_FILMS_SUCCESS]: loadFilmsSuccess,
    [types.ADD_FILM_SUCCESS]: addFilmSuccess,
    [types.UPDATE_FILM_SUCCESS]: updateFilmSuccess,
    [types.DELETE_FILM_SUCCESS]: deleteFilmSuccess,
  },
  initialState,
);

export default reducer;

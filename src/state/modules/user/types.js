// Admin
const LOAD_USER = 'user/LOAD_USER';
const USER_LOADING = 'user/USER_LOADING';
const USER_LOADED = 'user/USER_LOADED';
const AUTH_ERROR = 'user/AUTH_ERROR';

// Login
const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_FAIL = 'user/LOGIN_FAIL';

// Login Google
const LOGIN_GOOGLE = 'user/LOGIN_GOOLE';
const LOGIN_GOOGLE_SUCCESS = 'user/LOGIN_GOOGLE_SUCCESS';
const LOGIN_GOOGLE_FAIL = 'user/LOGIN_GOOGLE_FAIL';

// Login Facebook
const LOGIN_FACEBOOK = 'user/LOGIN_FACEBOOK';
const LOGIN_FACEBOOK_SUCCESS = 'user/LOGIN_FACEBOOK_SUCCESS';
const LOGIN_FACEBOOK_FAIL = 'user/LOGIN_FACEBOOK_FAIL;';

// Register
const REGISTER = 'user/REGISTER';
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
const REGISTER_FAIL = 'user/REGISTER_FAIL';

// Logout
const LOGOUT = 'user/LOGOUT';
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';

const UPDATE_USER = 'user/UPDATE_USER';
const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS';

const CHANGE_PASSWORD = 'user/CHANGE_PASSWORD';

const types = {
  LOAD_USER,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN,
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAIL,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  CHANGE_PASSWORD,
};

export default types;

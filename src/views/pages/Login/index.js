/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import { registerNoResApi } from 'apis/userApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { adminActions, adminSelectors } from 'state/modules/admin';
import { errorActions, errorSelectors } from 'state/modules/error';
import { userActions, userSelectors } from 'state/modules/user';
import validation from 'utils/validation';
import './style.scss';

const Login = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const error = useSelector((state) => errorSelectors.error(state));
  const isAuthenticatedUser = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const isAuthenticatedAdmin = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );

  const [loginID, setLoginID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [validate, setValidate] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL' || error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(errorActions.clearErrors());
    };
    // eslint-disable-next-line
  }, []);

  const isAdmin = pathname.indexOf('admin') !== -1;
  const isRegister = pathname.indexOf('register') !== -1;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userLogin = isAdmin && !isRegister ? loginID : email;
    const checkValidate = isRegister
      ? validation(userName, userLogin, password, rePassword) &&
        rePassword === password
      : validation(userLogin, password);
    if (checkValidate) {
      setValidate('');
      const data = isRegister
        ? { userName, userEmail: email, userPassword: password }
        : !isAdmin
        ? {
            userEmail: email,
            userPassword: password,
          }
        : { loginID, password };
      isRegister
        ? isAdmin
          ? registerNoResApi(data)
          : dispatch(userActions.register(data))
        : !isAdmin
        ? dispatch(userActions.login(data))
        : dispatch(adminActions.login(data));
      if (isAdmin && isRegister) {
        setTimeout(() => history.push('/admin/manage/users'), 500);
      }
    } else if (isRegister && rePassword !== password) {
      setValidate('M???t kh???u nh???p l???i kh??ng kh???p');
    } else {
      setValidate('??i???n t???t c??? c??c ?? tr???ng');
    }
  };

  const responseSuccessGoogle = async (res) => {
    try {
      dispatch(userActions.loginGoogle(res.tokenId));
    } catch (err) {
      console.log(err);
    }
  };

  const responseFailGoogle = (res) => {
    console.log(res);
  };

  const responseFacebook = async (res) => {
    try {
      dispatch(
        userActions.loginFacebook({
          accessToken: res.accessToken,
          userID: res.userID,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {isRegister ? '????ng k?? - VMOflix' : '????ng nh???p - VMOflix'}
        </title>
      </Helmet>
      {!isAdmin ? (
        !isAuthenticatedUser ? null : props.location.state ? (
          <Redirect to={props.location.state.pathname} />
        ) : (
          <Redirect to='/' />
        )
      ) : isAuthenticatedAdmin && !isRegister ? (
        <Redirect to='/admin/manage/films' />
      ) : null}
      <div className='login bg-black h-screen flex items-center justify-center'>
        <div className='login__background w-full h-full opacity-50 absolute'>
          <img
            src='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg'
            srcSet='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w'
            alt=''
            className='object-cover w-full h-full'
          />
        </div>
        <div className='login__navbar absolute top-0 h-9rem px-4% flex items-center justify-center sm:justify-start w-full'>
          <Link to={isAdmin && isRegister ? '/admin/manage/users' : '/'}>
            <img
              className='h-4rem lg:h-4.5rem'
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618458158/VMOflix%20Project/VMOflix%20-%20base/VMOFLIX-02-02_bpjidv.webp'
              alt='Logo'
            />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className='login__form z-1 bg-black bg-opacity-80 px-8 py-14 sm:px-24 sm:py-24 flex flex-col'
        >
          <div className='flex justify-between items-center mb-10'>
            <h3 className='text-30 text-white font-bold'>
              {isRegister ? '????ng k??' : '????ng nh???p'}
            </h3>
            {isRegister && !isAdmin ? (
              <Link to='/login' className='text-red-primary text-16 font-bold'>
                ????ng nh???p
              </Link>
            ) : null}
          </div>
          {!msg ? null : (
            <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
              {msg}
            </div>
          )}
          {!validate ? null : (
            <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
              {validate}
            </div>
          )}
          {isRegister ? (
            <input
              type='text'
              className='login__form-input'
              placeholder='T??n ng?????i d??ng'
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : null}
          <input
            type={!isAdmin ? 'email' : 'text'}
            className='login__form-input'
            placeholder={isAdmin && !isRegister ? 'LoginID' : 'Email'}
            onChange={(e) => {
              const { value } = e.target;
              isAdmin && !isRegister ? setLoginID(value) : setEmail(value);
            }}
          />
          <input
            type='password'
            className='login__form-input'
            placeholder='M???t kh???u'
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegister ? (
            <input
              type='password'
              className='login__form-input'
              placeholder='Nh???p l???i m???t kh???u'
              onChange={(e) => setRePassword(e.target.value)}
            />
          ) : null}
          <button
            type='submit'
            className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
          >
            {!isRegister ? '????ng nh???p' : '????ng k??'}
          </button>
          {!isRegister && !isAdmin ? (
            <>
              <Link to='/forgot-password' className='text-red-primary text-16 mt-6'>
                Qu??n m???t kh???u ?
              </Link>
              <div className='flex items-center pt-6 pb-4'>
                <span className='text-white text-14 mr-2'>
                  Ch??a c?? t??i kho???n ?
                </span>
                <Link
                  className='text-red-primary text-14 font-bold hover:text-red-primary-d'
                  to='/register'
                >
                  ????ng k?? ngay
                </Link>
              </div>
            </>
          ) : null}
          {!isAdmin ? (
            <>
              <div className='text-14 border-t border-gray-primary-d pt-6 text-gray-primary text-center my-6'>
                <span>????ng nh???p b???ng</span>
              </div>
              <div className='login__social flex'>
                <GoogleLogin
                  clientId='820242333597-7tbh02vghgiunu7ekdkugpte288cqhjb.apps.googleusercontent.com'
                  buttonText='Google'
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailGoogle}
                  cookiePolicy='single_host_origin'
                  className='justify-center flex-1 mr-4'
                  icon={false}
                />
                <FacebookLogin
                  appId='761669164547706'
                  autoLoad={false}
                  fields='name,email,picture'
                  callback={responseFacebook}
                  textButton='Facebook'
                  cssClass='text-white text-20 bg-blue-facebook w-full h-full rounded-md hover:bg-blue-facebook-d'
                />
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};

Login.propTypes = {
  state: PropTypes.object,
  location: PropTypes.object,
};

Login.defaultProps = {
  state: {},
  location: {},
};

export default Login;

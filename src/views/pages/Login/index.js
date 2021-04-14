/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { adminActions, adminSelectors } from 'state/modules/admin';
import { errorSelectors } from 'state/modules/error';
import validation from 'utils/validation';
import './style.scss';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => errorSelectors.error(state));
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const [loginID, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation(loginID, password)) {
      const dataAdmin = {
        loginID,
        password,
      };
      dispatch(adminActions.login(dataAdmin));
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to='/' />
      ) : (
        <div className='login bg-black h-screen flex items-center justify-center'>
          <div className='login__background bg-cover overflow-hidden h-full opacity-50 absolute'>
            <img
              src='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg'
              srcSet='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w'
              alt=''
            />
          </div>
          <div className='login__navbar absolute top-0 h-9rem px-6rem flex items-center w-full'>
            <Link to='/'>
              <img
                className='h-4.5rem'
                src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618366203/Review%20Film%20Project/base/VMOFLIX-02_cd79e3.png'
                alt='Logo'
              />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className='login__form z-1 bg-black bg-opacity-80 p-24 flex flex-col'
          >
            <h3 className='text-30 text-white font-bold mb-10'>Đăng nhập</h3>
            {!msg ? null : (
              <div className='bg-red-100 mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500'>
                {msg}
              </div>
            )}
            <input
              type='text'
              className='login__form-input'
              placeholder='LoginID'
              onChange={(e) => setLoginID(e.target.value)}
            />
            <input
              type='text'
              className='login__form-input'
              placeholder='Mật khẩu'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='submit'
              className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              Đăng nhập
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;

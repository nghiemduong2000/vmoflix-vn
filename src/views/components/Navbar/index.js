/* eslint-disable max-len */
import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { adminActions, adminSelectors } from 'state/modules/admin';
import './style.scss';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const admin = useSelector((state) => adminSelectors.admin(state));

  return (
    <div className='navbar h-6.8rem px-6rem flex items-center justify-between fixed w-full top-0 bg-gradient-to-b from-black-body z-1'>
      <Link to='/'>
        <img
          // eslint-disable-next-line max-len
          src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618458158/Review%20Film%20Project/base/VMOFLIX-02-02_bpjidv.png'
          alt='Logo'
          className='h-2.5rem'
        />
      </Link>
      <div className='navbar__right flex'>
        {!isAuthenticated ? (
          <Link
            to='/login'
            className='navbar__btn bg-red-primary hover:bg-red-primary-d text-16 px-7 py-3'
          >
            Đăng nhập
          </Link>
        ) : (
          <div className='flex items-center'>
            <Link
              to='/create'
              className={`flex items-center text-28 mr-12 ${
                pathname === '/create' ? 'text-red-primary' : 'text-white'
              }`}
            >
              <RiEdit2Fill />
            </Link>
            <span className='text-white text-18 font-bold mr-8'>
              {admin.get('loginID').toUpperCase()}
            </span>
            <button
              type='button'
              className='navbar__btn bg-red-primary hover:bg-red-primary-d text-16 px-7 py-3'
              onClick={() => dispatch(adminActions.logout())}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

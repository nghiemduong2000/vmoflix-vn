import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminSelectors } from 'state/modules/admin';
import './style.scss';

const Navbar = (props) => {
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const admin = useSelector((state) => adminSelectors.admin(state));

  return (
    <div className='navbar h-6.8rem bg-black-navbar px-6rem flex items-center justify-between'>
      <Link to='/'>
        <img
          // eslint-disable-next-line max-len
          src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618366203/Review%20Film%20Project/base/VMOFLIX-02_cd79e3.png'
          alt='Logo'
          className='h-2.5rem'
        />
      </Link>
      <div className='navbar__right flex'>
        {!isAuthenticated ? (
          <>
            <Link className='navbar__btn flex items-center text-28 mr-12'>
              <RiEdit2Fill />
            </Link>
            <Link
              to='/login'
              className='navbar__btn bg-red-primary hover:bg-red-primary-d text-16 px-7 py-3'
            >
              Đăng nhập
            </Link>
          </>
        ) : (
          <span>{admin.loginID.toUpperCase()}</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;

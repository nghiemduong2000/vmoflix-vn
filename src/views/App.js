/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { FaFacebookF, FaWikipediaW } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { adminActions } from 'state/modules/admin';
import { filmsActions, filmsSelectors } from 'state/modules/film';
import { Loading } from 'utils/Loadable';
import routers from '../routers';
import './App.scss';
import ScrollToTop from './components/ScrollToTop';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://exercise-blog-api.herokuapp.com/'
    : 'http://localhost:5000';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => filmsSelectors.loading(state));

  useEffect(() => {
    dispatch(adminActions.loadAdmin());
    dispatch(filmsActions.loadFilms());
  }, []);

  return (
    <div className={`App bg-black-body ${loading ? 'h-screen' : 'h-full'}`}>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <ScrollToTop />
          <Switch>
            <Switch>
              {routers.map((route, i) => (
                // eslint-disable-next-line
                <Route exact key={i} {...route} />
              ))}
            </Switch>
          </Switch>
        </Router>
      )}
      <footer className='footer flex justify-center items-center border-t-4 border-red-primary py-4rem relative'>
        <img
          src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1615915194/logoVMO-PNG-02_ybelrn.png'
          alt='logo'
          className='w-20rem mr-4rem'
        />
        <div className='flex flex-start'>
          <div className='footer__about flex flex-col w-40rem mr-4rem'>
            <img
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618458158/Review%20Film%20Project/base/VMOFLIX-02-02_bpjidv.png'
              alt='logo'
              className='w-10rem mb-4'
            />
            <p className='text-16 text-white'>
              Trang review, đánh giá phim chiếu rạp, tổng hợp giới thiệu phim
              hay, cập nhật những thông tin điện ảnh Việt Nam và Thế Giới hàng
              đầu Việt Nam
            </p>
          </div>
          <div className='footer__contact'>
            <h3 className='text-20 font-bold text-white mb-4'>LIÊN HỆ</h3>
            <ul className='flex'>
              <li className='mr-2'>
                <a
                  href='https://www.facebook.com/Vmogroup2012'
                  target='_blank'
                  rel='noreferrer'
                  className='block bg-red-primary w-3.5rem h-3.5rem flex items-center justify-center rounded-md hover:bg-red-primary-d transition-all duration-200'
                >
                  <FaFacebookF className='text-18 text-black-body' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.vmogroup.com/'
                  target='_blank'
                  rel='noreferrer'
                  className='block bg-red-primary w-3.5rem h-3.5rem flex items-center justify-center rounded-md hover:bg-red-primary-d transition-all duration-200'
                >
                  <FaWikipediaW className='text-18 text-black-body' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

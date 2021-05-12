/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines */
/* eslint-disable max-len */
import { addFilmApi, getAFilmApi, updateFilmApi } from 'apis/filmApi';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { adminSelectors } from 'state/modules/admin';
import { categoriesSelectors } from 'state/modules/categories';
import { Loading } from 'utils/Loadable';
import validation from 'utils/validation';
import CustomSwitch from 'views/components/CustomSwitch';
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';
import './style.scss';

const CreateEditFilm = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { slug } = useParams();

  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const isAddFilmPage = pathname === '/admin/films/add';

  const [state, setState] = useState({
    currentFilm: {},
    loading: !isAddFilmPage,
    switchMode: false,
    error: '',
    title: '',
    titleSearch: '',
    actor: '',
    description: '',
    genre: [],
    posterFilm: '',
    bannerFilm: '',
    youtubeURL: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAddFilmPage) {
      const getFilm = async () => {
        try {
          setState({
            ...state,
            loading: true,
          });
          const response = await getAFilmApi(slug);
          const currentFilm = response.data;
          const {
            title,
            titleSearch,
            actor,
            description,
            genre,
            posterFilm,
            bannerFilm,
            youtubeURL,
          } = currentFilm;
          setState((newState) => ({
            ...newState,
            currentFilm,
            title,
            titleSearch,
            actor: actor.join(', '),
            description,
            genre,
            posterFilm,
            bannerFilm,
            youtubeURL,
            loading: false,
          }));
        } catch (err) {
          console.log(err);
        }
      };

      getFilm();
    }
    // eslint-disable-next-line
  }, []);

  const handleCheckbox = (item) => {
    const existing = state.genre.indexOf(item);
    if (existing !== -1) {
      setState({
        ...state,
        genre: state.genre.filter((_item, index) => existing !== index),
      });
    } else {
      setState({
        ...state,
        genre: [...state.genre, item],
      });
    }
  };

  const progressData = async () => {
    const dataUpload = {
      title: state.title,
      images: [state.posterFilm, state.bannerFilm],
      description: state.description,
      genre: state.genre,
      isUpload: state.switchMode,
      actor: state.actor.split(',').map((item) => item.trim().toLowerCase()),
      youtubeURL: state.youtubeURL,
      titleSearch: state.titleSearch,
    };

    if (isAddFilmPage) {
      await addFilmApi(dataUpload);
    } else {
      await updateFilmApi(slug, dataUpload);
    }
    setError('');
    history.push('/admin/manage/films');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddFilmPage) {
      if (
        validation(
          state.title,
          state.description,
          state.posterFilm,
          state.bannerFilm,
          state.youtubeURL,
          state.actor,
          state.titleSearch,
        ) &&
        state.genre.length > 0
      ) {
        progressData();
      } else {
        setError('Vui lòng điền tất cả ô trống');
      }
    } else {
      progressData();
    }
  };

  const toggleSwitchMode = () => {
    setState({
      ...state,
      switchMode: !state.switchMode,
      posterFilm: '',
      bannerFilm: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>
          {isAddFilmPage ? 'Admin - Thêm phim' : 'Admin - Sửa phim'}
        </title>
      </Helmet>
      {!isAuthenticated ? (
        <Redirect to='/admin' />
      ) : state.loading ? (
        <Loading />
      ) : (
        <div className='createReview flex items-center justify-center'>
          <div className='createReview__background h-screen fixed top-0 w-full bg-black'>
            <img
              className='w-full h-full object-cover filter blur'
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618500603/Review%20Film%20Project/base/vmoflix-tv-logo_gd1rmx.png'
              alt=''
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className='createReview__form z-1 bg-black-body bg-opacity-80 py-6 px-4 sm:py-24 sm:px-24 flex flex-col mt-10rem mb-10rem w-11/12 lg:w-90rem'
          >
            <h3 className='text-24 sm:text-30 text-white font-bold mb-4 sm:mb-10'>
              {isAddFilmPage ? 'Thêm phim mới' : 'Sửa phim'}
            </h3>
            {!error ? null : (
              <div className='mb-8 border-2 border-red-primary rounded-lg text-16 py-4 px-6 text-red-primary'>
                {error}
              </div>
            )}
            <label htmlFor='title'>
              <span className='text-20 text-white mb-2 block'>Tên phim</span>
              <input
                id='title'
                type='text'
                className='createReview__form-input'
                placeholder='Tiêu đề bài viết'
                onChange={(e) => {
                  setState({
                    ...state,
                    title: e.target.value,
                  });
                }}
                value={state.title}
              />
            </label>
            <label htmlFor='titleSearch'>
              <span className='text-20 text-white mb-2 block'>
                Tên phim khi tìm kiếm
              </span>
              <input
                id='titleSearch'
                type='text'
                className='createReview__form-input'
                placeholder='Tiêu đề tìm kiếm'
                onChange={(e) => {
                  setState({
                    ...state,
                    titleSearch: e.target.value,
                  });
                }}
                value={state.titleSearch}
              />
            </label>
            <label htmlFor='actor' className='text-20 text-white'>
              <span className='mb-2 block'>Diễn viên</span>
              <input
                id='actor'
                type='text'
                className='createReview__form-input'
                placeholder='Diễn viên'
                onChange={(e) => {
                  setState({
                    ...state,
                    actor: e.target.value,
                  });
                }}
                value={state.actor}
              />
            </label>

            <span>Thể loại</span>
            <div className='flex flex-wrap mb-6'>
              {categories.map((item) => (
                <label
                  htmlFor={item.genre}
                  key={item._id}
                  className='text-20 text-white w-1/2 sm:w-1/4 mb-4 sm:mb-0 relative pl-12 createReview__form-checkbox'
                >
                  <input
                    id={item.genre}
                    type='checkbox'
                    className='absolute opacity-0 cursor-pointer h-0 w-0'
                    checked={state.genre.indexOf(item.genre) !== -1}
                    onChange={() => {
                      handleCheckbox(item.genre);
                    }}
                  />
                  <span />
                  {item.genre}
                </label>
              ))}
            </div>

            <label htmlFor='youtubeURL'>
              <span className='text-20 text-white mb-2 block'>URL phim</span>
              <input
                id='youtubeURL'
                type='text'
                value={state.youtubeURL}
                placeholder='URL phim'
                className='createReview__form-input'
                onChange={(e) => {
                  setState({
                    ...state,
                    youtubeURL: e.target.value,
                  });
                }}
              />
            </label>

            <label className='flex items-center justify-center mb-6'>
              <span className='text-16 text-white mr-4'>URL</span>
              <CustomSwitch
                checked={state.switchMode}
                onChange={toggleSwitchMode}
                name='checkedC'
              />
              <span className='text-16 text-white ml-4'>Upload</span>
            </label>
            {state.switchMode ? (
              <div className='createReview__form-input flex'>
                <InputImageFile
                  id='posterFilm'
                  value={state.posterFilm}
                  placeholder='Chọn Poster'
                  width='w-14rem'
                  setState={(value) => {
                    setState((newState) => ({
                      ...newState,
                      posterFilm: value,
                    }));
                  }}
                  styleContainer='mr-6'
                  styleLabel='ml-6'
                />
                <InputImageFile
                  id='bannerFilm'
                  value={state.bannerFilm}
                  placeholder='Chọn Banner'
                  width='w-26rem'
                  setState={(value) => {
                    setState({
                      ...state,
                      bannerFilm: value,
                    });
                  }}
                  styleContainer='mr-6'
                  styleLabel='ml-6'
                />
              </div>
            ) : (
              <div className='flex'>
                <InputImageUrl
                  className='w-12rem my-6'
                  placeholder='URL Poster'
                  value={state.posterFilm}
                  setState={(value) => {
                    setState({
                      ...state,
                      posterFilm: value,
                    });
                  }}
                  styleContainer='bg-gray-primary-d rounded-md mr-6 mb-6'
                  styleReset='mt-2 text-30'
                />
                <InputImageUrl
                  className='w-30rem my-6'
                  placeholder='URL Banner'
                  value={state.bannerFilm}
                  styleContainer='bg-gray-primary-d rounded-md mb-6'
                  setState={(value) => {
                    setState({
                      ...state,
                      bannerFilm: value,
                    });
                  }}
                  styleReset='mt-2 text-30'
                />
              </div>
            )}
            <span className='mb-2'>Nội dung chính</span>
            <textarea
              className='createReview__form-input h-20rem'
              placeholder='Mô tả bài viết'
              onChange={(e) => {
                setState({
                  ...state,
                  description: e.target.value,
                });
              }}
              value={state.description}
            />
            <button
              type='submit'
              className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              {isAddFilmPage ? 'Thêm phim' : 'Sửa phim'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateEditFilm;

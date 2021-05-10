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
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';
import './style.scss';

const CreateEditFilm = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { filmId } = useParams();

  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const isAddFilmPage = pathname === '/admin/films/add';

  const [loading, setLoading] = useState(!isAddFilmPage);
  const [isUpload, setIsUpload] = useState('URL');
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState([]);
  const [posterFilm, setPosterFilm] = useState('');
  const [posterFilmDefault, setPosterFilmDefault] = useState('');
  const [bannerFilm, setBannerFilm] = useState('');
  const [bannerFilmDefault, setBannerFilmDefault] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [titleSearch, setTitleSearch] = useState('');

  useEffect(() => {
    if (!isAddFilmPage) {
      const getFilm = async () => {
        try {
          setLoading(true);
          const response = await getAFilmApi(filmId);
          const currentFilm = response.data;
          setTitle(currentFilm.title);
          setActor(currentFilm.actor.join(', '));
          setDescription(currentFilm.description);
          setGenre(currentFilm.genre);
          setPosterFilm(currentFilm.posterFilm);
          setPosterFilmDefault(currentFilm.posterFilm);
          setBannerFilm(currentFilm.bannerFilm);
          setBannerFilmDefault(currentFilm.bannerFilm);
          setYoutubeURL(currentFilm.youtubeURL);
          setTitleSearch(currentFilm.titleSearch);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      getFilm();
    }
    // eslint-disable-next-line
  }, []);

  const handleCheckbox = (item) => {
    const existing = genre.indexOf(item);
    if (existing !== -1) {
      setGenre(genre.filter((_item, index) => existing !== index));
    } else {
      setGenre([...genre, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validation(title, description, genre, posterFilm, bannerFilm, youtubeURL)
    ) {
      const dataUpload = {
        title,
        images: [posterFilm, bannerFilm],
        description,
        genre,
        isUpload,
        actor:
          typeof actor === 'string'
            ? actor.split(',').map((item) => item.trim().toLowerCase())
            : actor,
        youtubeURL,
        titleSearch,
      };

      if (isAddFilmPage) {
        addFilmApi(dataUpload);
      } else {
        updateFilmApi(filmId, dataUpload);
      }
      setError('');
      setTimeout(() => history.push('/admin/manage/films'), 500);
    } else {
      setError('Vui lòng điền tất cả ô trống');
    }
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
      ) : loading ? (
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                onChange={(e) => setTitleSearch(e.target.value)}
                value={titleSearch}
              />
            </label>
            <label htmlFor='actor' className='text-20 text-white'>
              <span className='mb-2 block'>Diễn viên</span>
              <input
                id='actor'
                type='text'
                className='createReview__form-input'
                placeholder='Diễn viên'
                onChange={(e) => setActor(e.target.value)}
                value={actor}
              />
            </label>

            <span>Thể loại</span>
            <div className='flex flex-wrap mb-6'>
              {categories.map((item) => (
                <label
                  htmlFor={item.genre}
                  key={item.id}
                  className='text-20 text-white w-1/2 sm:w-1/4 mb-4 sm:mb-0 relative pl-12 createReview__form-checkbox'
                >
                  <input
                    id={item.genre}
                    type='checkbox'
                    className='absolute opacity-0 cursor-pointer h-0 w-0'
                    checked={genre.indexOf(item.genre) !== -1}
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
                value={youtubeURL}
                placeholder='URL phim'
                className='createReview__form-input'
                onChange={(e) => setYoutubeURL(e.target.value)}
              />
            </label>

            <div
              className='text-white text-20 mb-2'
              onChange={(e) => {
                setIsUpload(e.target.value);
                setPosterFilm('');
                setBannerFilm('');
              }}
            >
              <span className='mr-6'>Ảnh</span>
              <label htmlFor='url' className='mr-6'>
                <input
                  className='mr-2'
                  id='url'
                  type='radio'
                  name='image'
                  value='URL'
                  defaultChecked={isUpload === 'URL'}
                />
                Url
              </label>
              <label htmlFor='upload'>
                <input
                  className='mr-2'
                  id='upload'
                  type='radio'
                  name='image'
                  value='UPLOAD'
                  defaultChecked={isUpload === 'UPLOAD'}
                />
                Upload
              </label>
            </div>
            {isUpload === 'UPLOAD' ? (
              <div className='createReview__form-input flex'>
                <InputImageFile
                  id='posterFilm'
                  value={posterFilm}
                  valueDefault={posterFilmDefault}
                  placeholder='Chọn Poster'
                  width='w-16rem'
                  setState={(value) => setPosterFilm(value)}
                  styleContainer='mr-6'
                  styleLabel='ml-6'
                  styleReset='mt-2 text-30'
                />
                <InputImageFile
                  id='bannerFilm'
                  valueDefault={bannerFilmDefault}
                  value={bannerFilm}
                  placeholder='Chọn Banner'
                  width='w-28rem'
                  setState={(value) => setBannerFilm(value)}
                  styleContainer='mr-6'
                  styleLabel='ml-6'
                  styleReset='mt-2 text-30'
                />
              </div>
            ) : (
              <div className='flex'>
                <InputImageUrl
                  className='w-12rem my-6'
                  placeholder='URL Poster'
                  value={posterFilm}
                  valueDefault={posterFilmDefault}
                  setState={(value) => setPosterFilm(value)}
                  styleContainer='bg-gray-primary-d rounded-md mr-6 mb-6'
                  styleReset='mt-2 text-30'
                />
                <InputImageUrl
                  className='w-30rem my-6'
                  placeholder='URL Banner'
                  value={bannerFilm}
                  valueDefault={bannerFilmDefault}
                  styleContainer='bg-gray-primary-d rounded-md mb-6'
                  setState={(value) => setBannerFilm(value)}
                  styleReset='mt-2 text-30'
                />
              </div>
            )}
            <span className='mb-2'>Nội dung chính</span>
            <textarea
              className='createReview__form-input h-20rem'
              placeholder='Mô tả bài viết'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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

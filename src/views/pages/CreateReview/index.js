/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filmsActions } from 'state/modules/film';
import validation from 'utils/validation';
import Editor from 'views/components/Editor';
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';
import Navbar from 'views/components/Navbar';
import './style.scss';

const CreateReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isUpload, setIsUpload] = useState('URL');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [content, setContent] = useState('');
  const [posterFilm, setPosterFilm] = useState('');
  const [bannerFilm, setBannerFilm] = useState('');
  const [review, setReview] = useState({
    content: '',
    actor: '',
    sound: '',
    scene: '',
  });

  const handleOnChange = (html) => {
    setContent(html);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validation(
        title,
        author,
        description,
        genre,
        content,
        posterFilm,
        bannerFilm,
        ...Object.values(review),
      )
    ) {
      const dataUpload = {
        title,
        images: [posterFilm, bannerFilm],
        author,
        description,
        genre,
        content,
        review,
        isUpload,
      };

      dispatch(filmsActions.addFilm(dataUpload));
      setError('');
      history.push('/');
    } else {
      setError('Vui lòng điền tất cả ô trống');
    }
  };

  return (
    <div className='createReview flex items-center justify-center'>
      <Navbar />
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
          Tạo bài viết
        </h3>
        {!error ? null : (
          <div className='mb-8 border-2 border-red-primary rounded-lg text-16 py-4 px-6 text-red-primary'>
            {error}
          </div>
        )}
        <input
          type='text'
          className='createReview__form-input'
          placeholder='Tiêu đề bài viết'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type='text'
          className='createReview__form-input'
          placeholder='Tác giả'
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <input
          type='text'
          className='createReview__form-input'
          placeholder='Thể loại'
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
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
              checked={isUpload === 'URL'}
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
              checked={isUpload === 'UPLOAD'}
            />
            Upload
          </label>
        </div>
        {isUpload === 'UPLOAD' ? (
          <div className='createReview__form-input flex'>
            <InputImageFile
              id='posterFilm'
              value={posterFilm}
              placeholder='Chọn Poster'
              width='w-16rem'
              setState={(value) => setPosterFilm(value)}
            />
            <InputImageFile
              id='bannerFilm'
              value={bannerFilm}
              placeholder='Chọn Banner'
              width='w-28rem'
              setState={(value) => setBannerFilm(value)}
            />
          </div>
        ) : (
          <div className='flex'>
            <InputImageUrl
              className='w-12rem'
              placeholder='URL Poster'
              value={posterFilm}
              setState={(value) => setPosterFilm(value)}
            />
            <InputImageUrl
              className='w-30rem'
              placeholder='URL Banner'
              value={bannerFilm}
              setState={(value) => setBannerFilm(value)}
            />
          </div>
        )}
        <textarea
          className='createReview__form-input'
          placeholder='Mô tả bài viết'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <span className='mb-2'>Review</span>
        <div className='createReview__form-review'>
          <input
            type='text'
            className='createReview__form-review-input'
            placeholder='Nội dụng (0-10)'
            value={review.content}
            onChange={(e) =>
              setReview({
                ...review,
                content: e.target.value,
              })
            }
          />
          <input
            type='text'
            className='createReview__form-review-input'
            placeholder='Diễn viên (0-10)'
            value={review.actor}
            onChange={(e) =>
              setReview({
                ...review,
                actor: e.target.value,
              })
            }
          />
          <input
            type='text'
            className='createReview__form-review-input'
            placeholder='Âm thanh (0-10)'
            value={review.sound}
            onChange={(e) =>
              setReview({
                ...review,
                sound: e.target.value,
              })
            }
          />
          <input
            type='text'
            className='createReview__form-review-input'
            placeholder='Cảnh quay (0-10)'
            value={review.scene}
            onChange={(e) =>
              setReview({
                ...review,
                scene: e.target.value,
              })
            }
          />
        </div>
        <Editor handleOnChange={handleOnChange} editorHtml={content} />
        <button
          type='submit'
          className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
        >
          Đăng bài
        </button>
      </form>
    </div>
  );
};

export default CreateReview;

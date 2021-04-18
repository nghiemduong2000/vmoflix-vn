import dateFormat from 'dateformat';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filmsSelectors } from 'state/modules/film';
import Navbar from 'views/components/Navbar';
import DetailReviewBanner from './components/DetailReviewBanner';
import './style.scss';

const DetailReview = () => {
  const { id } = useParams();
  const films = useSelector((state) => filmsSelectors.films(state)).toJS();
  const currentFilm = films.find((film) => film._id === id);

  return (
    <div className='detailReview pb-6rem'>
      <Navbar />
      <>
        <DetailReviewBanner currentFilm={currentFilm} />
        <div className='detailReview__body w-4/5 2xl:w-100rem mx-auto mt-4rem'>
          <div className='detailReview__info flex justify-between mb-4rem text-white text-22 flex-wrap'>
            <span className='detailReview__info-author'>
              <strong>Tác giả:</strong>
              {` ${currentFilm.author}`}
            </span>
            <span className='detailReview__info-date'>
              <strong>
                {dateFormat(
                  new Date(currentFilm.date),
                  'dddd, mmmm dS, yyyy, h:MM TT',
                )}
              </strong>
            </span>
          </div>
          <div className='detailReview__body-description text-white text-20 mb-4rem'>
            <em>{currentFilm.description}</em>
          </div>
          <div
            className='detailReview__body-main'
            dangerouslySetInnerHTML={{
              __html: currentFilm.content,
            }}
          />
        </div>
      </>
    </div>
  );
};

export default DetailReview;

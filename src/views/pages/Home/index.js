/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { filmsSelectors } from 'state/modules/film';
import { Loading } from 'utils/Loadable';
import Banner from 'views/components/Banner';
import FilmListingsByGenre from 'views/components/FilmListingsByGenre';
import Navbar from 'views/components/Navbar';

const HomePage = () => {
  const loading = useSelector((state) => filmsSelectors.loading(state));

  return (
    <div className='home pb-20'>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Banner />
          {['all', 'drama', 'fantasy', 'action', 'adventure', 'mystery'].map(
            (item, index) => {
              return <FilmListingsByGenre genre={item} key={index} />;
            },
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;

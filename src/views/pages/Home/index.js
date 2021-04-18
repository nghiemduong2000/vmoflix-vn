/* eslint-disable react/no-array-index-key */
import React from 'react';
import Banner from 'views/components/Banner';
import FilmListingsByGenre from 'views/components/FilmListingsByGenre';
import Navbar from 'views/components/Navbar';

const HomePage = () => {
  return (
    <div className='home pb-20'>
      <Navbar />
      <Banner />
      <div className='filmListingsByGenre__wrap -mt-8rem md:-mt-14rem 2xl:-mt-30rem'>
        {['all', 'drama', 'fantasy', 'action', 'adventure', 'mystery'].map(
          (item, index) => {
            return <FilmListingsByGenre genre={item} key={index} />;
          },
        )}
      </div>
    </div>
  );
};

export default HomePage;

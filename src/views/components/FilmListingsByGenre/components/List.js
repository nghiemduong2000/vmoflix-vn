/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const List = (props) => {
  const { films, className } = props;
  return (
    <ul
      className={`filmListingsByGenre__list flex-1 flex flex-listFilm ${className}`}
    >
      {films.map((film) => (
        <li
          key={film._id}
          className='transition duration-200 transform origin-center hover:scale-125 hover:z-1 first:origin-left mr-10 last:origin-right w-9.74%'
        >
          <Link to='/' className='block h-26rem'>
            <img
              className='object-cover w-full h-full'
              src={film.posterFilm}
              alt='poster'
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  films: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

export default List;

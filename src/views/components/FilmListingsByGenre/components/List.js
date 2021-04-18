/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const List = (props) => {
  const { films, className, order, numItemPerList, margin } = props;
  return (
    <ul
      className={`filmListingsByGenre__list flex-1 flex flex-listFilm ${className}`}
      style={{
        order,
      }}
    >
      {films.map((film) => (
        <li
          key={film._id}
          className='transition duration-200 transform origin-center xl:hover:scale-125 hover:z-1 first:origin-left last:origin-right'
          style={{
            width: `calc((100% - (${numItemPerList} * ${margin})) / ${numItemPerList})`,
            marginRight: margin,
          }}
        >
          <Link
            to={`/${film._id}`}
            className='block'
            style={{ padding: '70% 0' }}
          >
            <img
              className='object-cover w-full h-full absolute top-0'
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
  order: PropTypes.number.isRequired,
  numItemPerList: PropTypes.number.isRequired,
  margin: PropTypes.string.isRequired,
};

export default List;

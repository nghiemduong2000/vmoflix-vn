import PropTypes from 'prop-types';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { categoriesSelectors } from 'state/modules/categories';
import sortOptions from '../ListUsers/data';

const FilterAdmin = (props) => {
  const {
    sortData,
    handleSortData,
    handleFlag,
    handleGenreFilter,
    handleSearch,
    handleData,
  } = props;

  const { pathname } = useLocation();
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const genresOptions = categories.map((item) => ({
    value: item.genre,
    label: item.vn,
  }));

  const stylesSelect = {
    container: (styles) => ({
      ...styles,
      flex: '1',
      ':not(:last-child)': {
        marginRight: '1rem',
      },
    }),
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: '#333',
      border: 'none',
      outline: isFocused ? 'none' : 'none',
      borderRadius: '0.375rem',
      minHeight: '43px',
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? 'rgb(229, 9, 20)' : 'rgb(156,163,175)',
      fontSize: '20px',
      backgroundColor: '#333',
      ':hover': {
        backgroundColor: '#555',
      },
      ':checked': {
        color: 'rgb(229, 9, 20)',
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: '#333',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0 0 0 1.5rem',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: 'rgb(156,163,175)',
      fontSize: '20px',
      fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
      lineHeight: '2rem',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'rgb(156,163,175)',
      fontSize: '20px',
      fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
      lineHeight: '2rem',
    }),
    multiValue: (styles) => ({
      ...styles,
      fontSize: '14px',
      margin: '0 0 0 4px',
      backgroundColor: 'white',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),
    indicatorContainer: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: 'hsl(0, 0%, 40%)',
      },
    }),
  };

  const isManageFilms = pathname.indexOf('films') !== -1;

  return (
    <div className='listFilms__searchFilter bg-black-body mb-6 rounded-xl'>
      <h3 className='text-24 text-white font-bold py-4 px-8 bg-black-navbar border-b border-gray-primary-d rounded-t-xl'>
        {isManageFilms ? 'Bộ lọc phim' : 'Bộ lọc người dùng'}
      </h3>
      <div className='px-8 py-6'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFlag();
          }}
          className='w-full flex items-stretch mb-4'
        >
          <input
            type='text'
            placeholder={
              isManageFilms ? 'Điền tên phim' : 'Điền tên người dùng'
            }
            className='px-6 py-4 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md mr-8'
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            type='submit'
            className='text-20 text-white bg-red-primary px-16 rounded-md hover:bg-red-primary-d'
          >
            <FaSearch />
          </button>
        </form>
        <div className='flex'>
          {isManageFilms ? (
            <Select
              isMulti
              options={genresOptions}
              styles={stylesSelect}
              onChange={(option) =>
                handleGenreFilter(option.map((item) => item.value))
              }
              placeholder='Thể loại'
            />
          ) : null}
          <Select
            value={sortData}
            options={sortOptions}
            styles={stylesSelect}
            onChange={(option) => {
              handleSortData(option);
              if (!option.value) {
                handleFlag();
              } else {
                handleData(option);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

FilterAdmin.propTypes = {
  sortData: PropTypes.object.isRequired,
  handleSortData: PropTypes.func.isRequired,
  handleFlag: PropTypes.func.isRequired,
  handleGenreFilter: PropTypes.func,
  handleSearch: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
};

FilterAdmin.defaultProps = {
  handleGenreFilter: () => {},
};

export default FilterAdmin;

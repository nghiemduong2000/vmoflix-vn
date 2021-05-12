/* eslint-disable indent */
/* eslint-disable func-names */
import { deleteFilmApi, getFilmsFilterApi } from 'apis/filmApi';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';
import { Loading } from 'utils/Loadable';
import FilterAdmin from '../FilterAdmin';
import sortOptions from '../ListUsers/data';
import './style.scss';

const ListFilms = (props) => {
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const [state, setState] = useState({
    films: [],
    loading: true,
    flag: true,
    genreFilter: [],
    sortFilms: sortOptions[0],
    search: '',
  });

  // Get data from store
  useEffect(() => {
    (async function () {
      setState({
        ...state,
        loading: true,
      });

      const queryObj = {};

      if (state.genreFilter.length !== 0) {
        queryObj.genre = state.genreFilter;
      }

      if (state.search) {
        queryObj.q = state.search;
      }

      const query = queryString.stringify(queryObj);
      const responseAll = await getFilmsFilterApi(query ? `?${query}` : query);

      setState((newState) => ({
        ...newState,
        sortFilms: sortOptions[0],
        films: responseAll.data,
        loading: false,
      }));
    })();
    // eslint-disable-next-line
  }, [state.flag, state.genreFilter]);

  const handleFlag = () => {
    setState({
      ...state,
      flag: !state.flag,
    });
  };

  const handleDelete = async (id) => {
    await deleteFilmApi(id);
    setTimeout(() => handleFlag(), 500);
  };

  const handleSortFilms = (option) => {
    setState({
      ...state,
      sortFilms: option,
    });
  };

  const handleFilms = (option) => {
    setState({
      ...state,
      sortFilms: option,
      films: state.films.sort((a, b) => {
        const reverse = option.value === 'dateZa' || option.value === 'nameZa';
        switch (option.type) {
          case 'name':
            if (reverse) {
              return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
            }
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          case 'date':
            return !reverse
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date);
          default:
            return new Date(b.date) - new Date(a.date);
        }
      }),
    });
  };

  const handleGenreFilter = (value) => {
    setState({
      ...state,
      genreFilter: value,
    });
  };

  const handleSearch = (value) => {
    setState({
      ...state,
      search: value,
    });
  };

  return (
    <div className='listFilms w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý phim</title>
      </Helmet>

      <FilterAdmin
        sortData={state.sortFilms}
        handleData={handleFilms}
        handleSortData={handleSortFilms}
        handleFlag={handleFlag}
        handleGenreFilter={handleGenreFilter}
        handleSearch={handleSearch}
      />
      <div className='bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listFilms__heading text-24 font-bold text-white py-4'>
            Danh sách phim
          </h1>
          <Link
            to='/admin/films/add'
            className='bg-red-primary text-16 text-white py-3 px-6 rounded-md hover:bg-red-primary-d'
          >
            Thêm phim
          </Link>
        </div>
        {state.loading ? (
          <Loading />
        ) : (
          <div className='listFilms__wrapTable h-70rem'>
            <table>
              <thead>
                <tr>
                  <th className='pl-3rem' style={{ width: '2%' }}>
                    Stt
                  </th>
                  <th>Poster</th>
                  <th style={{ width: '18%' }}>Tên phim</th>
                  <th style={{ width: '14%' }}>Diễn viên</th>
                  <th style={{ width: '14%' }}>Thể loại</th>
                  <th style={{ width: '30%' }}>Nội dung</th>
                  <th className='pr-1rem' style={{ width: '10%' }} colSpan='2'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.films.map((film, index) => {
                  const {
                    posterFilm,
                    title,
                    titleSearch,
                    actor,
                    genre,
                    description,
                  } = film;
                  return (
                    <tr key={film._id}>
                      <td className='text-center pl-3rem pt-4'>{index + 1}</td>
                      <td className=''>
                        <div className='p-film block relative left-1/2 transform -translate-x-1/2'>
                          <LazyLoadImage
                            alt={posterFilm}
                            effect='blur'
                            src={posterFilm}
                            wrapperClassName='listFilms__table--img w-full h-full absolute top-0 left-0'
                          />
                        </div>
                      </td>
                      <td className='h-18rem overflow-y-auto'>
                        <span className='block mb-2'>
                          <strong className='text-gray-primary-l'>
                            Tên phim:
                          </strong>
                          {` ${title}`}
                        </span>
                        <span>
                          <strong className='text-gray-primary-l'>
                            Tên tìm kiếm:
                          </strong>
                          {` ${titleSearch}`}
                        </span>
                      </td>
                      <td className='capitalize'>
                        {capitalizeFirstLetter(actor.join(', '))}
                      </td>
                      <td>
                        {categories
                          .filter((item) => {
                            for (let i = 0; i < genre.length; i++) {
                              if (item.genre === genre[i]) {
                                return true;
                              }
                            }
                            return false;
                          })
                          .map((item) => item.vn)
                          .join(', ')}
                      </td>
                      <td className='w-full h-18rem overflow-y-auto inline-block'>
                        {description}
                      </td>
                      <td>
                        <Link
                          to={`/admin/films/${film.slug}`}
                          className='flex justify-center cursor-pointer'
                        >
                          <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-22 transition-all duration-200' />
                        </Link>
                      </td>
                      <td className='pr-1rem'>
                        <div className='flex justify-center cursor-pointer'>
                          <FaTrashAlt
                            className='btnAction text-red-primary hover:text-red-primary-d text-22 transition-all duration-200'
                            onClick={() => handleDelete(film._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFilms;

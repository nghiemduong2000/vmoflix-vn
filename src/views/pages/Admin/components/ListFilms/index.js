/* eslint-disable indent */
/* eslint-disable func-names */
import { Modal, Snackbar } from '@material-ui/core';
import { deleteFilmApi, getFilmsFilterApi, updateFilmApi } from 'apis/filmApi';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEdit, FaTrashAlt, FaTrashRestore } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { MdRemoveCircle } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { VscClose } from 'react-icons/vsc';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';
import { Loading } from 'utils/Loadable';
import FilterAdmin from '../FilterAdmin';
import sortOptions from '../ListUsers/data';
import './style.scss';

const ListFilms = (props) => {
  const { pathname, state: isUpdated } = useLocation();
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const isBin = pathname.indexOf('bin') !== -1;

  const [state, setState] = useState({
    films: [],
    loading: true,
    flag: true,
    genreFilter: [],
    sortFilms: sortOptions[0],
    search: '',
    lastSlug: '',
    modalWarning: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      if (isBin) {
        queryObj.bin = true;
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

  useEffect(() => {
    if (isUpdated) {
      setMessage(
        isUpdated === 'update'
          ? 'Cập nhật phim thành công'
          : 'Tạo phim thành công',
      );
      setLoading(true);
    }
    // eslint-disable-next-line
  }, []);

  const handleFlag = () => {
    setState({
      ...state,
      flag: !state.flag,
    });
  };

  const handleDelete = async (slug) => {
    try {
      if (!isBin) {
        await updateFilmApi(slug, { softDelete: true });
        setState({
          ...state,
          lastSlug: slug,
        });
        setTimeout(() => handleFlag(), 500);
        setMessage(
          'Đã chuyển phim vào thùng rác (Truy cập thùng rác để khôi phục)',
        );
        setLoading(true);
      } else {
        await deleteFilmApi(slug);
        setTimeout(() => handleFlag(), 500);
        setMessage('Phim đã bị xóa vĩnh viễn');
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async (film) => {
    try {
      await updateFilmApi(film.slug, { softDelete: false });
      setTimeout(() => handleFlag(), 500);
      setMessage(`Đã khôi phục phim ${film.title}`);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
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

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={loading}
        autoHideDuration={6000}
        onClose={() => setLoading(!loading)}
        message={(
          <div className='flex items-center mr-10'>
            <FcCheckmark className='text-20 leading-20' />
            <span className='text-20 ml-4'>{message}</span>
          </div>
        )}
        action={(
          <TiDeleteOutline
            className='pr-4 text-30 text-red-primary leading-20 cursor-pointer'
            onClick={() => setLoading(false)}
          />
        )}
      />
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
          <div className=''>
            <Link
              to='/admin/films/add'
              className='bg-red-primary text-16 text-white py-3 px-6 rounded-md hover:bg-red-primary-d mr-6'
            >
              Thêm phim
            </Link>
            <Link
              to={`/admin/manage/films${isBin ? '' : '/bin'}`}
              className='border border-red-primary text-16 text-red-primary py-3 px-6 rounded-md hover:bg-gray-primary-d'
            >
              {isBin ? 'Danh sách phim' : 'Thùng rác'}
            </Link>
          </div>
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
                      <Modal
                        open={state.modalWarning}
                        onClose={() => {
                          setState({
                            ...state,
                            modalWarning: !state.modalWarning,
                          });
                        }}
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        className='flex items-center justify-center'
                      >
                        <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
                          <div
                            className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                            onClick={() => {
                              setState({
                                ...state,
                                modalWarning: false,
                              });
                            }}
                          >
                            <VscClose className='text-30 text-white' />
                          </div>
                          <MdRemoveCircle className='text-80 text-red-primary' />
                          <h3 className='text-30 text-red-primary mt-6 pb-4 font-bold'>
                            CẢNH BÁO
                          </h3>
                          <span className='text-20 text-white mb-16 block w-85% text-center text-red-primary'>
                            Hành động xóa này không thể khôi phục cân nhắc trước
                            khi xóa
                          </span>
                          <span className='text-20 text-white mb-10 text-center'>
                            Bạn có chắc muốn xóa ?
                          </span>
                          <button
                            type='button'
                            className='py-4 px-10 bg-red-primary hover:bg-red-primary-d text-20 rounded-md text-white'
                            onClick={() => handleDelete(film.slug)}
                          >
                            Đồng ý
                          </button>
                        </div>
                      </Modal>
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
                        {isBin ? (
                          <FaTrashRestore
                            className='btnAction cursor-pointer text-orange-primary hover:text-orange-primary-d text-28 transition-all duration-200'
                            onClick={() => handleRestore(film)}
                          />
                        ) : (
                          <Link
                            to={`/admin/films/${film.slug}`}
                            className='flex justify-center cursor-pointer'
                            aria-label='Sửa phim'
                          >
                            <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-26 transition-all duration-200' />
                          </Link>
                        )}
                      </td>
                      <td className='pr-1rem'>
                        <div className='flex justify-center cursor-pointer'>
                          {isBin ? (
                            <FaTrashAlt
                              className='btnAction text-red-primary hover:text-red-primary-d text-28 transition-all duration-200'
                              onClick={() =>
                                setState({
                                  ...state,
                                  modalWarning: true,
                                })
                              }
                            />
                          ) : (
                            <MdRemoveCircle
                              className='btnAction text-red-primary hover:text-red-primary-d text-28 transition-all duration-200'
                              onClick={() => handleDelete(film.slug)}
                            />
                          )}
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

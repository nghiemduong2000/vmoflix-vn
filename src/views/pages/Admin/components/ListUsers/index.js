/* eslint-disable indent */
/* eslint-disable func-names */
import { getUsersFilterApi } from 'apis/userApi';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Loading } from 'utils/Loadable';
import FilterAdmin from '../FilterAdmin';
import RowTableUsers from './components/RowTableUsers';
import sortOptions from './data';
import './style.scss';

const ListUsers = (props) => {
  const [state, setState] = useState({
    loading: true,
    sortUsers: sortOptions[0],
    users: [],
    flag: true,
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
      if (state.search) {
        queryObj.q = state.search;
      }
      const query = queryString.stringify(queryObj);
      const responseAll = await getUsersFilterApi(query ? `?${query}` : query);
      setState((newState) => ({
        ...newState,
        sortUsers: sortOptions[0],
        users: responseAll.data,
        loading: false,
      }));
    })();
    // eslint-disable-next-line
  }, [state.flag]);

  const handleFlag = () => {
    setState({
      ...state,
      flag: !state.flag,
    });
  };

  const handleSortUsers = (option) => {
    setState({
      ...state,
      sortUsers: option,
    });
  };

  const handleUsers = (option) => {
    setState({
      ...state,
      sortUsers: option,
      users: state.users.sort((a, b) => {
        const reverse = option.value === 'dateZa' || option.value === 'nameZa';
        switch (option.type) {
          case 'name':
            if (reverse) {
              return a.userName < b.userName
                ? 1
                : a.userName > b.userName
                ? -1
                : 0;
            }
            return a.userName < b.userName
              ? -1
              : a.userName > b.userName
              ? 1
              : 0;
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

  const handleSearch = (value) => {
    setState({
      ...state,
      search: value,
    });
  };

  return (
    <div className='listUsers w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý người dùng</title>
      </Helmet>

      <FilterAdmin
        sortData={state.sortUsers}
        handleData={handleUsers}
        handleSortData={handleSortUsers}
        handleFlag={handleFlag}
        handleSearch={handleSearch}
      />
      <div className='bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listUsers__heading text-24 font-bold text-white py-4'>
            Danh sách người dùng
          </h1>
          <Link
            to='/admin/manage/users/register'
            className='bg-red-primary text-16 text-white py-3 px-6 rounded-md hover:bg-red-primary-d'
          >
            Thêm người dùng
          </Link>
        </div>
        {state.loading ? (
          <Loading />
        ) : (
          <div className='listUsers__wrapTable h-50rem'>
            <table>
              <thead>
                <tr>
                  <th className='pl-3rem' style={{ width: '5%' }}>
                    Stt
                  </th>
                  <th>Avatar</th>
                  <th style={{ width: '25%' }}>Tên</th>
                  <th style={{ width: '25%' }}>Email</th>
                  <th style={{ width: '20%' }}>Ngày tham gia</th>
                  <th style={{ width: '10%' }}>Trạng thái</th>
                  <th className='pr-1rem' style={{ width: '10%' }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user, index) => (
                  <RowTableUsers key={user._id} user={user} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ListUsers);

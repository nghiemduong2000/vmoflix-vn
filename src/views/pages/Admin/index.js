import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateAdminRoute from 'routers/components/PrivateAdminRoute';
import PublicAdminRoute from 'routers/components/PublicAdminRoute';
import { adminActions, adminSelectors } from 'state/modules/admin';
import { Loading } from 'utils/Loadable';
import CreateEditFilm from '../CreateEditFilm';
import Login from '../Login';
import AmountAdmin from './components/AmountAdmin';
import HeaderAdmin from './components/HeaderAdmin';
import ListCategories from './components/ListCategories';
import ListFilms from './components/ListFilms';
import ListUsers from './components/ListUsers';
import SidebarAdmin from './components/SidebarAdmin';

const Admin = (props) => {
  const dispatch = useDispatch();
  const { match } = props;
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );

  // Get data from store
  useEffect(() => {
    dispatch(adminActions.loadAdmin());

    // eslint-disable-next-line
  }, []);

  const CreateEditFilmAdmin = () => {
    return (
      <>
        <HeaderAdmin />
        <Switch>
          <Route path={`${match.url}/films/add`} component={CreateEditFilm} />
          <Route
            path={`${match.url}/films/:filmId`}
            component={CreateEditFilm}
          />
        </Switch>
      </>
    );
  };
  const ManageAdmin = () => {
    return (
      <div className='h-full bg-black-light'>
        <HeaderAdmin />
        <div className='flex'>
          <div className=' fixed z-0 top-0 w-full opacity-30'>
            <img
              className='w-full h-full object-cover filter blur'
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618500603/Review%20Film%20Project/base/vmoflix-tv-logo_gd1rmx.png'
              alt=''
            />
          </div>
          <SidebarAdmin />
          <div className='flex-1 pb-20 relative'>
            <AmountAdmin />
            <Switch>
              <PrivateAdminRoute
                path={`${match.url}/manage/films`}
                component={ListFilms}
                exact
              />
              <PrivateAdminRoute
                path={`${match.url}/manage/users`}
                component={ListUsers}
              />
              <PrivateAdminRoute
                path={`${match.url}/manage/categories`}
                component={ListCategories}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {typeof isAuthenticated === 'object' ? (
        <Loading />
      ) : (
        <Switch>
          <PublicAdminRoute path={`${match.url}`} component={Login} exact />
          <PrivateAdminRoute
            path={`${match.url}/manage/users/register`}
            component={Login}
          />
          <Route path={`${match.url}/manage/:params`} component={ManageAdmin} />
          <Route component={CreateEditFilmAdmin} />
        </Switch>
      )}
    </>
  );
};

Admin.propTypes = {
  match: PropTypes.any.isRequired,
};

export default React.memo(Admin);

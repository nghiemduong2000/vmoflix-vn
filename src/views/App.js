/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  categoriesActions,
  categoriesSelectors,
} from 'state/modules/categories';
import { userActions } from 'state/modules/user';
import { Loading } from 'utils/Loadable';
import routers from '../routers';
import './App.scss';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Admin from './pages/Admin';
import DetailFilm from './pages/DetailFilm';
import Login from './pages/Login';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://exercise-blog-api.herokuapp.com/'
    : 'http://localhost:5000';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => categoriesSelectors.loading(state));

  useEffect(() => {
    dispatch(userActions.loadUser());
    dispatch(categoriesActions.getCategories());
  }, []);

  const HaveNavbar = () => {
    return (
      <>
        <Helmet>
          <title>VMOflix</title>
        </Helmet>
        <Navbar />
        <Switch>
          {routers.map((route, i) => (
            // eslint-disable-next-line
            <Route exact key={i} {...route} />
          ))}
        </Switch>
      </>
    );
  };

  const HaveFooter = () => {
    return (
      <>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Login} />
          <Route path='/film/:slug' component={DetailFilm} />
          <Route component={HaveNavbar} />
        </Switch>
        <Footer />
      </>
    );
  };

  return (
    <div className='App bg-black-body min-h-screen'>
      <Router>
        <ScrollToTop />
        {loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route component={HaveFooter} />
          </Switch>
        )}
      </Router>
    </div>
  );
};

export default App;

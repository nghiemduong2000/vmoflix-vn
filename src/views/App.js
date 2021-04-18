/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { adminActions } from 'state/modules/admin';
import { filmsActions, filmsSelectors } from 'state/modules/film';
import { Loading } from 'utils/Loadable';
import routers from '../routers';
import './App.scss';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://exercise-blog-api.herokuapp.com/'
    : 'http://localhost:5000';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => filmsSelectors.loading(state));

  useEffect(() => {
    dispatch(adminActions.loadAdmin());
    dispatch(filmsActions.loadFilms());
  }, []);

  return (
    <div className={`App bg-black-body ${loading ? 'h-screen' : 'h-full'}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Router>
            <ScrollToTop />
            <Switch>
              <Switch>
                {routers.map((route, i) => (
                  // eslint-disable-next-line
                  <Route exact key={i} {...route} />
                ))}
              </Switch>
            </Switch>
            <Footer />
          </Router>
        </>
      )}
    </div>
  );
};

export default App;

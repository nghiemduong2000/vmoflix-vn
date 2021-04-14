/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { adminActions } from 'state/modules/admin';
import routers from '../routers';
import './App.scss';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions.loadAdmin());
  }, []);

  return (
    <div className='App bg-black-body h-screen'>
      <Router>
        <Switch>
          <Switch>
            {routers.map((route, i) => (
              // eslint-disable-next-line
              <Route exact key={i} {...route} />
            ))}
          </Switch>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

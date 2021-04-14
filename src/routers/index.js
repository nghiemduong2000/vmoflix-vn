import Login from 'views/pages/Login';
import Loadable from '../utils/Loadable';

const HomePage = Loadable(() =>
  import(/* webpackChunkName: "js/home" */ '@Views/pages/Home'),
);

const routers = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
  },
];

export default routers;

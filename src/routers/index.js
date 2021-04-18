import CreateReview from 'views/pages/CreateReview';
import DetailReview from 'views/pages/DetailReview';
import HomePage from 'views/pages/Home';
import Login from 'views/pages/Login';

// const HomePage = Loadable(() =>
//   import(/* webpackChunkName: "js/home" */ '@Views/pages/Home'),
// );

const routers = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/create',
    component: CreateReview,
  },
  {
    path: '/:id',
    component: DetailReview,
  },
];

export default routers;

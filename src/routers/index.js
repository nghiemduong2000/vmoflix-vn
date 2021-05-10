import CreateEditReview from 'views/pages/CreateEditFilm';
import HomePage from 'views/pages/Home';
import SearchFilms from 'views/pages/SearchFilms';
import User from 'views/pages/User';

const routers = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/user/account',
    component: User,
  },
  {
    path: '/create',
    component: CreateEditReview,
  },
  {
    path: '/edit/:id',
    component: CreateEditReview,
  },
  {
    path: '/search',
    component: SearchFilms,
  },
  {
    path: '/category',
    component: SearchFilms,
  },
];

export default routers;

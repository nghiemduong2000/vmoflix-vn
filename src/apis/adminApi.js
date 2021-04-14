import axios from 'axios';

export const getAdminApi = async () => {
  const promise = await axios.get('/api/admin', { withCredentials: true });
  return promise;
};

export const authApi = async ({ loginID, password }) => {
  console.log('hello');
  const promise = await axios.post(
    '/api/admin/auth',
    { loginID, password },
    {
      withCredentials: true,
    },
  );
  return promise;
};

export const logoutApi = async () => {
  const promise = await axios.get('/api/admin/deleteCookie', {
    withCredentials: true,
  });
  return promise;
};

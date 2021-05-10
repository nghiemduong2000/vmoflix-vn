import axios from 'axios';

export const getAmountAdminApi = async () => {
  const promise = await axios.get('/api/admin/amount', {
    withCredentials: true,
  });
  return promise;
};

export const getAdminApi = async () => {
  const promise = await axios.get('/api/admin', { withCredentials: true });
  return promise;
};

export const authAdminApi = async ({ loginID, password }) => {
  const promise = await axios.post(
    '/api/admin/auth',
    { loginID, password },
    {
      withCredentials: true,
    },
  );
  return promise;
};

export const logoutAdminApi = async () => {
  const promise = await axios.get('/api/admin/deleteCookie', {
    withCredentials: true,
  });
  return promise;
};

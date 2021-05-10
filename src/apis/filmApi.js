import axios from 'axios';

const path = '/api/films';

export const getAFilmApi = async (id) => {
  const promise = await axios.get(`${path}?filmId=${id}`, {
    withCredentials: true,
  });
  return promise;
};

export const getAFilmAndRelated = async (id) => {
  const promise = await axios.get(`${path}/related?filmId=${id}`, {
    withCredentials: true,
  });
  return promise;
};

export const getFilmsRecentApi = async (history) => {
  const promise = await axios.post(
    `${path}/recent`,
    { history },
    { withCredentials: true },
  );
  return promise;
};

export const getFilmsFilterApi = async (filter) => {
  const promise = await axios.get(`${path}/filter${filter}`, {
    withCredentials: true,
  });
  return promise;
};

export const addFilmApi = async (data) => {
  const promise = await axios.post(path, data, { withCredentials: true });
  return promise;
};

export const updateFilmApi = async (id, data) => {
  const promise = await axios.patch(`${path}/${id}`, data, {
    withCredentials: true,
  });
  return promise;
};

export const deleteFilmApi = async (id) => {
  try {
    await axios.delete(`${path}/${id}`, { withCredentials: true });
  } catch (err) {
    console.log(err);
  }
};

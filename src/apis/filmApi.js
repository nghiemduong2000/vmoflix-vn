import axios from 'axios';

const path = '/api/films';

export const getFilmApi = async () => {
  const promise = await axios.get(path);
  return promise;
};

export const addFilmApi = async (data) => {
  const promise = await axios.post(path, data);
  return promise;
};

export const updateFilmApi = async (id, data) => {
  const promise = await axios.patch(`${path}/${id}`, data);
  return promise;
};

export const deleteFilmApi = async (id) => {
  try {
    await axios.delete(`${path}/${id}`);
  } catch (err) {
    console.log(err);
  }
};

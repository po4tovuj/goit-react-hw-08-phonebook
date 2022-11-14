import axios from './api';
export const token = {
  set(token) {
    axios.defaults.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.common.Authorization = '';
  },
};
export const signUp = credentials => {
  return axios.post('/users/signup', credentials);
};
export const logIn = credentials => {
  return axios.post('/users/login', credentials);
};
export const logOut = payload => {
  return axios.post('/users/logout', payload);
};
export const getCurrentUser = payload => {
  return axios.get('/users/current');
};

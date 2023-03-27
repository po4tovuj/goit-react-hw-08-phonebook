import axios from './api';
export const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};
export const signUp = credentials => {
  return axios.post('/auth/signup', credentials);
};
export const logIn = credentials => {
  return axios.post('/auth/login', credentials);
};
export const logOut = payload => {
  return axios.post('/users/logout', payload);
};
export const getCurrentUser = payload => {
  return axios.get('/users/current');
};

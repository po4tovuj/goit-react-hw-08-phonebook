import axios from './api';
export const getContacts = () => {
  return axios.get('/publiccontacts').then(({ data }) => data);
};
export const addContact = payload => {
  return axios.post('/contacts', payload).then(({ data }) => data);
};
export const deleteContact = id => {
  return axios.delete(`/contacts/${id}`).then(({ data }) => data);
};

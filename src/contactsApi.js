import axios from './api';
const getContacts = () => {
  return axios.get('/contacts').then(({ data }) => data);
};
const addContact = payload => {
  return axios.post('/contacts', payload).then(({ data }) => data);
};
const deleteContact = id => {
  return axios.delete(`/contacts/${id}`).then(({ data }) => data);
};
const editContact = payload => {
  const { id, name, number } = payload;
  return axios
    .patch(`/contacts/${id}`, { name, number })
    .then(({ data }) => data);
};
export { getContacts, addContact, editContact, deleteContact };

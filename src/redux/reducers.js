// import { combineReducers } from 'redux';
// import { CONTACTS } from './constants';

// const contactsInitialState = JSON.parse(localStorage.getItem(CONTACTS)) || [];

// const filterInitialState = '';

// const contacts = (state = contactsInitialState, { type, payload }) => {
//   switch (type) {
//     case 'contacts/addContact': {
//       return [...state, payload];
//     }
//     case 'contacts/deleteContact': {
//       return state.filter(contact => contact.id !== payload);
//     }
//     default:
//       return state;
//   }
// };
// const filter = (state = filterInitialState, { type, payload }) => {
//   switch (type) {
//     case 'filter/changeFilter': {
//       return (state = payload);
//     }
//     default:
//       return state;
//   }
// };

// export const rootReducer = combineReducers({
//   contacts,
//   filter,
// });

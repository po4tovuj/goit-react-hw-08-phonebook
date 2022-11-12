import { createSlice } from '@reduxjs/toolkit';
import { fetchAll, addContact, deleteContact } from './operations';
import sortBy from 'lodash.sortby';
const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
function isPendingAction(action) {
  return action.type.endsWith('/pending');
}
function isRejectAction(action) {
  return action.type.endsWith('/rejected');
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.items = sortBy(payload, 'name');
        return state;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        // state.items.push(payload);
        state.items = sortBy([...state.items, payload], 'name');
        return;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(isRejectAction, handleRejected);
  },
});

// [addContact.fulfilled] {

//   state.isLoading = false;
//   state.error = null;
//   debugger;
//
//   state.items.push(payload);
// },
// [addContact.rejected]: handleRejected,
// [deleteContact.pending]: handlePending,
//   [deleteContact.fulfilled](state, { payload }) {
//     state.isLoading = false;
//     state.error = null;

//   },
//   [deleteContact.rejected]: handleRejected,
// },
// reducers: {
//   addContact: {
//     reducer({ contacts }, { payload }) {
//       contacts.items.push(payload);
//     },
//     prepare({ name, number }) {
//       return {
//         payload: {
//           id: shortid.generate(),
//           name,
//           number,
//         },
//       };
//     },
//   },
//   deleteContact({ contacts }, { payload }) {
//     const idx = contacts.items.findIndex(contact => contact.id === payload);
//     contacts.items.splice(idx, 1);
//   },
// },

// export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;

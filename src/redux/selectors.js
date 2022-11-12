export const getContacts = state => {
  return state.contacts.items;
};
export const getIsLoading = state => state.contacts.isLoading;
export const getContactsError = state => state.contacts.error;
export const getFilter = state => state.filter;
export const getFilteredContacts = state => {
  const contacts = getContacts(state);
  const filter = getFilter(state);
  const normalizeFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
};

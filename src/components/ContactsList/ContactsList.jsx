import { useSelector } from 'react-redux';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { getFilter, getFilteredContacts } from 'redux/contacts/selectors';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const ContactsList = ({ createNewContact }) => {
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <>
      {!filteredContacts.length ? (
        <Text>
          {!filter ? 'No saved contacts' : 'Contact not found'}. Would you like
          to <span onClick={createNewContact}>create a contact</span>
        </Text>
      ) : (
        <ul>
          {filteredContacts.map(({ id, name, number }) => {
            return <ContactItem key={id} id={id} name={name} number={number} />;
          })}
        </ul>
      )}
    </>
  );
};
ContactsList.propsTypes = {
  createNewContact: PropTypes.func,
};

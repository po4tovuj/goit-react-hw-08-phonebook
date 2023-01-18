import { useDispatch, useSelector } from 'react-redux';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { getFilter, getFilteredContacts } from 'redux/contacts/selectors';
import { Box, List, Text, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CustomModal from 'components/Modals/CustomModal';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { useState } from 'react';
import { updateContact as editContact } from 'redux/contacts/operations';

export const ContactsList = ({ createNewContact }) => {
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContact, setSelectedContact] = useState({
    name: '',
    number: '',
    id: '',
  });
  const updateContact = contact => {
    dispatch(editContact({ ...selectedContact, ...contact }));
  };
  const handleOpenEdit = contact => {
    setSelectedContact(contact);
    onOpen();
  };
  return (
    <>
      {!filteredContacts.length ? (
        <Text mt={4}>
          {!filter ? 'No saved contacts' : 'Contact not found'}. Would you like
          to{' '}
          <Box
            as="span"
            cursor="pointer"
            color="blue"
            onClick={createNewContact}
          >
            create a contact?
          </Box>
        </Text>
      ) : (
        <List gap={4} display="flex" flexDirection="column" mt={4} pb={4}>
          {filteredContacts.map(contact => {
            return (
              <ContactItem
                key={contact.id}
                contact={contact}
                updateContact={handleOpenEdit}
              />
            );
          })}
        </List>
      )}
      <CustomModal handleClose={onClose} isOpen={isOpen} title="Edit Contact">
        <ContactForm
          handleSubmit={updateContact}
          contactName={selectedContact.name}
          contactNumber={selectedContact.number}
          handleClose={onClose}
        />
      </CustomModal>
    </>
  );
};
ContactsList.propsTypes = {
  createNewContact: PropTypes.func,
};

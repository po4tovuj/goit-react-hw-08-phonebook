import { Button, Container, HStack, useDisclosure } from '@chakra-ui/react';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import CustomModal from 'components/Modals/CustomModal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from 'redux/contacts/operations';
import { addContact } from 'redux/contacts/operations';

const ContactsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  const createContact = values => {
    dispatch(addContact(values));
  };
  return (
    <Container maxW={'container.xl'} py={4}>
      <HStack w="100%">
        <ContactFilter w="80%" />
        <Button onClick={onOpen}>+</Button>
      </HStack>

      <ContactsList createNewContact={onOpen}></ContactsList>
      <CustomModal handleClose={onClose} isOpen={isOpen} title="New Contact">
        <ContactForm isNew handleSubmit={createContact} handleClose={onClose} />
      </CustomModal>
    </Container>
  );
};
export default ContactsPage;

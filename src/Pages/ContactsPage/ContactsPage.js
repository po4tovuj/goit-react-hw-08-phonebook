import {
  Button,
  Container,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from 'redux/contacts/operations';

export const ContactsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Container maxW={'container.xl'} pt={4}>
      <HStack w="100%">
        <ContactFilter w="80%" />
        <Button onClick={onOpen}>+</Button>
      </HStack>

      <ContactsList createNewContact={onOpen}></ContactsList>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm handleClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

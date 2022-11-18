import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
const CustomModal = ({ handleClose, isOpen, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.200">
          {title}
          <ModalCloseButton top="15px" />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CustomModal;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React from 'react';
const CustomModal = ({ handleClose, isOpen, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader py={2} borderBottom="1px" borderColor="gray.200">
          {title}
          <ModalCloseButton
            _hover={{ color: 'red.500', backgroundColor: 'gray.100' }}
          />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CustomModal;

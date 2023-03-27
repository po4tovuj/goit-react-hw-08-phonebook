import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { Box, Button, ListItem, Spacer, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
export const ContactItem = ({ contact, updateContact }) => {
  const dispatch = useDispatch();
  const { _id, name, phone } = contact;

  const handleDelete = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(deleteContact(_id));
  };
  return (
    <ListItem
      border="1px"
      borderColor="gray.200"
      maxW="350px"
      p="4px 8px"
      borderRadius="md"
      display="flex"
      alignItems={'center'}
    >
      <Box>
        <Text textTransform="capitalize" fontWeight="700">
          {' '}
          {name}
        </Text>{' '}
        <Text> tel. {phone}</Text>
      </Box>
      <Spacer />
      <EditIcon
        boxSize={5}
        _hover={{ transform: 'scale(1.2)', cursor: 'pointer' }}
        onClick={() => updateContact(contact)}
        mr={4}
      />
      <Button
        _hover={{ transform: 'scale(1.05)' }}
        colorScheme="red"
        size="xs"
        onClick={handleDelete}
      >
        Delete <DeleteIcon ml={2} />
      </Button>
      {/* </Contact> */}
    </ListItem>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    updateContact: PropTypes.func,
  }),
};

import PropTypes from 'prop-types';
import { Contact, DeleteBtn } from './ContactItem.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
export const ContactItem = ({ id, name = '', phone = '' }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));
  return (
    <li>
      <Contact>
        {name}: {phone}
        <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
      </Contact>
    </li>
  );
};
ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

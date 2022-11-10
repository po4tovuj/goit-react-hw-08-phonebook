import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { getContacts, getFilter } from 'redux/selectors';
const getFilteredContacts = ({ filter, contacts }) => {
  const normalizeFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
};
export const ContactsList = () => {
  const filter = useSelector(getFilter);

  const contacts = useSelector(getContacts);
  console.log('contacts: ', contacts);
  const filteredContacts = getFilteredContacts({ contacts, filter });

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => {
        return <ContactItem key={id} id={id} name={name} number={number} />;
      })}
    </ul>
  );
};
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
// export class ContactsList extends Component {
//   static defaultProps = {
//     contacts: [],
//   };
//   static defaultPropTypes = {
//     contacts: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//       })
//     ),
//   };

//   render() {
//     const { handleDelete, contacts } = this.props;

//     return (
//       <ul>
//         {contacts.map(({ id, name, number }) => {
//           return (
//             <ContactItem
//               key={id}
//               id={id}
//               name={name}
//               number={number}
//               handleDelete={handleDelete}
//             />
//           );
//         })}
//       </ul>
//     );
//   }
// }

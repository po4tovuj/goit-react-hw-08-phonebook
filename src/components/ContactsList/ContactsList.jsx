import { useSelector } from 'react-redux';

import { ContactItem } from 'components/ContactItem/ContactItem';
import { getFilteredContacts } from 'redux/selectors';

export const ContactsList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => {
        return <ContactItem key={id} id={id} name={name} phone={phone} />;
      })}
    </ul>
  );
};

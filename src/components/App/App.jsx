// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import shortid from 'shortid';

import { Section } from 'components/Section/Section';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';

const CONTACTS = 'CONTACTS';
export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(CONTACTS)) || []
  );
  const [filteredContacts, setFilterContacts] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    console.log('contacts: ', contacts);
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const normalizeFilter = filterQuery.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    setFilterContacts(filtered);
  }, [filterQuery, contacts, setFilterContacts]);

  const onFilterChange = query => {
    setFilterQuery(query);
  };
  const addContact = contact => {
    const isAlreadyExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyExist) {
      throw new Error(`${contact.name} is already in contacts`);
    }
    setContacts([{ ...contact, id: shortid.generate() }, ...contacts]);
    //   localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  };

  return (
    <Container>
      <Section title="PhoneBook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contact List">
        <ContactFilter
          onFilterChange={onFilterChange}
          filterQuery={filterQuery}
        />
        <ContactsList contacts={filteredContacts} handleDelete={handleDelete} />
      </Section>
    </Container>
  );
};
// export class App extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };
//   componentDidMount() {
//     this.setState({ contacts: this.getContactFromStorage() });
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       this.updateContactsInLocalStorage();
//     }
//   }
//   handleDelete = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };
//   onSubmit = contact => {
//     const isAlreadyExist = this.state.contacts.find(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );
//     if (isAlreadyExist) {
//       throw new Error(`${contact.name} is already in contacts`);
//     }
//     this.setState(prevState => {
//       return {
//         contacts: [
//           ...prevState.contacts,
//           { ...contact, id: shortid.generate() },
//         ],
//       };
//     });
//   };
//   getContactFromStorage = () => {
//     const contacts = ;
//     return contacts ? JSON.parse(contacts) : [];
//   };
//   updateContactsInLocalStorage() {
//     localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
//   }

//   onFilterChange = e => {
//     const { value } = e.target;

//     this.setState({ filterQuery: value });
//   };
//   filterContacts = () => {
//     const normalizeFilter = this.state.filterQuery.toLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   render() {
//     const filteredContacts = this.filterContacts();

//     return (
//       <Container>
//         <Section title="PhoneBook">
//           <ContactForm onSubmit={this.onSubmit} />
//         </Section>
//         <Section title="Contact List">
//           <ContactFilter
//             onFilterChange={this.onFilterChange}
//             filterQuery={this.state.filter}
//           />
//           <ContactsList
//             contacts={filteredContacts}
//             handleDelete={this.handleDelete}
//           />
//         </Section>
//       </Container>
//     );
//   }
// }

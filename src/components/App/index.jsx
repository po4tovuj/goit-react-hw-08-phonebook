import React, { Component } from 'react';
import { Section } from 'components/Section';
import { ContactList } from 'components/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm';
const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  handleDelete = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };
  onSubmit = contact => {
    const isAlreadyExist = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyExist) {
      throw new Error(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };
  render() {
    return (
      <Container>
        <Section title="PhoneBook">
          <ContactForm onSubmit={this.onSubmit} />
        </Section>
        <Section title="Contact List">
          <ContactList
            contacts={this.state.contacts}
            handleDelete={this.handleDelete}
          />
        </Section>
      </Container>
    );
  }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
// exp

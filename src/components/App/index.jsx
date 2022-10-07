import React, { Component } from 'react';
import { Section } from 'components/Section';
import { ContactList } from 'components/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm';
import shortid from 'shortid';
const INITIAL_STATE = {
  contacts: [],
};
const CONTACTS = 'CONTACTS';
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  handleDelete = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState(state => ({
      contacts: updatedContacts,
    }));
    localStorage.setItem(CONTACTS, JSON.stringify(updatedContacts));
  };
  onSubmit = contact => {
    const isAlreadyExist = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyExist) {
      throw new Error(`${contact.name} is already in contacts`);
    }
    const newContact = { ...contact, id: shortid.generate() };
    this.addContactToLocalStorage(newContact);
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };
  getContactFromStorage = () => {
    const contacts = localStorage.getItem(CONTACTS);
    return contacts ? JSON.parse(contacts) : [];
  };
  addContactToLocalStorage = contact => {
    let savedContacts = localStorage.getItem(CONTACTS);
    savedContacts = savedContacts ? JSON.parse(savedContacts) : [];
    console.log('savedContacts: ', savedContacts);
    savedContacts.push(contact);
    console.log('after savedContacts: ', savedContacts);
    localStorage.setItem(CONTACTS, JSON.stringify(savedContacts));
  };

  componentDidMount() {
    this.setState({ contacts: this.getContactFromStorage() });
  }
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

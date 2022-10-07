import React, { Component } from 'react';
import { Section } from 'components/Section';
import { ContactList } from 'components/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm';
import shortid from 'shortid';
const INITIAL_STATE = {
  contacts: [],
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
      return {
        contacts: [
          ...prevState.contacts,
          { ...contact, id: shortid.generate() },
        ],
      };
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

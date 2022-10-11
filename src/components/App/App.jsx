import React, { Component } from 'react';
import shortid from 'shortid';

import { Section } from 'components/Section/Section';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';

const INITIAL_STATE = {
  contacts: [],
  filterQuery: '',
};
const CONTACTS = 'CONTACTS';
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  componentDidMount() {
    this.setState({ contacts: this.getContactFromStorage() });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      this.updateContactsInLocalStorage();
    }
  }
  handleDelete = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
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
  getContactFromStorage = () => {
    const contacts = localStorage.getItem(CONTACTS);
    return contacts ? JSON.parse(contacts) : [];
  };
  updateContactsInLocalStorage() {
    localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
  }

  onFilterChange = e => {
    const { value } = e.target;

    this.setState({ filterQuery: value });
  };
  filterContacts = () => {
    const normalizeFilter = this.state.filterQuery.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const filteredContacts = this.filterContacts();

    return (
      <Container>
        <Section title="PhoneBook">
          <ContactForm onSubmit={this.onSubmit} />
        </Section>
        <Section title="Contact List">
          <ContactFilter
            onFilterChange={this.onFilterChange}
            filterQuery={this.state.filter}
          />
          <ContactsList
            contacts={filteredContacts}
            handleDelete={this.handleDelete}
          />
        </Section>
      </Container>
    );
  }
}

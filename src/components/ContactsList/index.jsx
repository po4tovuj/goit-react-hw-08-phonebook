import PropTypes from 'prop-types';
import { Component } from 'react';

import { ContactItem } from 'components/ContactItem';

import { ContactFilter } from 'components/ContactFilter';

export class ContactList extends Component {
  static defaultProps = {
    contacts: [],
  };
  static defaultPropTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
  };
  state = { filter: '' };
  onFilterChange = e => {
    const { value } = e.target;

    this.setState({ filter: value });
  };
  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.props.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  render() {
    const { handleDelete } = this.props;
    const filteredContacts = this.filterContacts();

    return (
      <>
        <ContactFilter
          onFilterChange={this.onFilterChange}
          filterQuery={this.filter}
        />
        <ul>
          {filteredContacts.map(({ id, name, number }) => {
            return (
              <ContactItem
                key={id}
                id={id}
                name={name}
                number={number}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

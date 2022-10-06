import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput } from './ContactForm.styled';
import shortid from 'shortid';
import { Button, Label } from 'components/CommonStyledComponents';

export class ContactForm extends Component {
  static defaultPropTypes = {
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    onSubmit: () => ({}),
  };
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  handleSubmit = e => {
    e.preventDefault();
    const id = shortid.generate();
    try {
      this.props.onSubmit({ ...this.state, id });
      this.reset();
    } catch (err) {
      alert(err.message || err);
    }
  };
  render() {
    const nameId = shortid.generate();
    const numberId = shortid.generate();
    return (
      <form>
        <Label htmlFor={nameId}>
          Name
          <FormInput
            id={nameId}
            name="name"
            type="text"
            value={this.state.name}
            pattern="\w{3,}"
            onChange={this.handleChange}
            required
          />
        </Label>

        <Label htmlFor={numberId}>
          Phone number
          <FormInput
            type="tel"
            name="number"
            id={numberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
        </Label>
        <Button type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}

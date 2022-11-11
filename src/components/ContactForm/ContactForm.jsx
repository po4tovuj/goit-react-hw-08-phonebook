import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { FormInput, Error } from './ContactForm.styled';
import { Button, Label } from 'components/CommonStyledComponents';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    isName: yup.boolean(),
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .min(3, 'Too short!')
      .required('Name is required!'),
    number: yup
      .string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Phone is required!'),
  });
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, { resetForm }) => {
        const name = values.name.toLowerCase();

        const isContactExist = contacts.find(contact => {
          const normalizeContactName = contact.name.toLowerCase();
          return normalizeContactName === name;
        });
        if (isContactExist) {
          return alert(`Contact '${values.name}' is already in contacts`);
        }
        dispatch(addContact(values));
        resetForm();
        // onSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        isValid,
        handleSubmit,
        handleBlur,
        dirty,
      }) => (
        <Form>
          <Label>
            Contact Name
            <FormInput
              type={'text'}
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            ></FormInput>
          </Label>
          {errors.name && <Error>{errors.name}</Error>}
          <Label>
            Phone number
            <FormInput
              type={'tel'}
              name={'number'}
              onChange={handleChange}
              value={values.number}
            ></FormInput>
            {touched.number && errors.number && <Error>{errors.number}</Error>}
          </Label>
          <Button type="submit" disabled={!dirty} onSubmit={handleSubmit}>
            Create Contact
          </Button>
        </Form>
      )}
    </Formik>
  );
};
ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

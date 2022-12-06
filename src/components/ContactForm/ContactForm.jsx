import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { VStack, Button, Box } from '@chakra-ui/react';
import TextField from 'components/Common/InputText';
import { Notify } from 'notiflix';

export const ContactForm = ({ handleClose }) => {
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
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const name = values.name.toLowerCase();

        const isContactExist = contacts.find(contact => {
          const normalizeContactName = contact.name.toLowerCase();
          return normalizeContactName === name;
        });
        if (isContactExist) {
          return alert(`Contact '${values.name}' is already in contacts`);
        }
        try {
          dispatch(addContact(values));
          resetForm();
          handleClose();
        } catch (error) {
          Notify.failure(`Contact wasn't created! ${error.message || ''}`);
          setSubmitting(false);
        }
        // onSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmiting, handleSubmit, handleBlur, resetForm, dirty }) => (
        <VStack
          as="form"
          // mx="auto"
          py={5}
          w={{ base: '90%', md: '300px' }}
          justifyContent="center"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Contact name"
            name="name"
            placeholder="Contact name"
            type="text"
            onBlur={handleBlur}
            autoComplete="off"
          ></TextField>
          <TextField
            label="Contact number"
            name="number"
            type="tel"
            placeholder="Contact number"
            onBlur={handleBlur}
            autoComplete="off"
          ></TextField>
          <Box as="p" pt={4}>
            <Button disabled={!dirty || isSubmiting} type="submit">
              Create Contact
            </Button>
            <Button
              type="button"
              onClick={() => {
                resetForm();
                this.handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};
ContactForm.propTypes = {
  handleClose: PropTypes.func,
};

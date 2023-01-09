import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { getContacts } from 'redux/contacts/selectors';
import { VStack, Button, Box } from '@chakra-ui/react';
import TextField from 'components/Common/InputText';
import { Notify } from 'notiflix';

export const ContactForm = ({
  handleClose,
  handleSubmit,
  contactName = '',
  contactNumber = '',
  isNew = false,
}) => {
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
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .min(7, 'Fill with a valid number')
      .max(15, 'Fill with a valid number')
      .required('Phone is required!'),
  });
  const contacts = useSelector(getContacts);

  return (
    <Formik
      initialValues={{ name: contactName, number: contactNumber }}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values, { resetForm, setSubmitting, dirty }) => {
        const name = values.name.toLowerCase();

        if (isNew || (!isNew && !dirty)) {
          const isContactExist = contacts.find(contact => {
            const normalizeContactName = contact.name.toLowerCase();
            return normalizeContactName === name;
          });
          if (isContactExist) {
            return Notify.failure(
              `Contact '${values.name}' is already in contacts`
            );
          }
        }

        try {
          handleSubmit(values);

          resetForm();
          handleClose();
        } catch (error) {
          Notify.failure(`${error.message ?? 'Action was failed'}`);
          setSubmitting(false);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmiting, handleSubmit, handleBlur, resetForm, dirty }) => (
        <VStack
          as="form"
          mx="auto"
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
            label="Phone number"
            name="number"
            type="tel"
            placeholder="Contact number"
            onBlur={handleBlur}
            autoComplete="off"
          ></TextField>
          <Box as="p" pt={4}>
            <Button
              mr={6}
              w="120px"
              disabled={!dirty || isSubmiting}
              type="submit"
            >
              {isNew ? 'Create' : 'Edit'}
            </Button>
            <Button
              type="button"
              w="120px"
              onClick={() => {
                resetForm();
                handleClose();
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

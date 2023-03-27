// import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Link,
  Stack,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import TextField from 'components/Common/InputText';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from 'redux/auth/operations';

const SignUpPage = () => {
  const [isSignUpFailed, setSignUpFail] = useBoolean(false);
  const navigate = useNavigate();
  const errorMessageTimeOut = useRef(null);
  const clearErrorMessage = () => {
    clearTimeout(errorMessageTimeOut);
  };
  // check is user already loggedIn

  useEffect(() => {
    if (isSignUpFailed) {
      errorMessageTimeOut.current = setTimeout(() => {
        setSignUpFail.off();
      }, 2000);
    }
    return () => {
      if (errorMessageTimeOut) return clearErrorMessage(errorMessageTimeOut);
    };
  }, [isSignUpFailed, setSignUpFail]);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name is too short!')
      .max(20, 'Name is too long!'),
    email: yup.string().email('invalid email').required('email is required!'),
    password: yup
      .string()
      .min(7, 'Password is too short')
      .required('Password is required!'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      handle
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        const { name, email, password } = values;
        console.log('register: ', register);

        try {
          await dispatch(register({ name, email, password }));
          resetForm();
          navigate('/contacts', { replace: true });
        } catch (error) {
          setSubmitting(false);
          setSignUpFail.on();
        }
      }}
    >
      {formik => (
        <VStack
          as="form"
          mx="auto"
          w={{ base: '90%', md: 400 }}
          py={5}
          justifyContent="center"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="name"
            placeholder="name"
            autoComplete="off"
            type="text"
          ></TextField>
          <TextField
            name="email"
            placeholder="enter email"
            autoComplete="off"
            type="email"
          ></TextField>
          <TextField
            name="password"
            type="password"
            autoComplete="off"
            placeholder="enter password"
          ></TextField>
          <TextField
            name="passwordConfirmation"
            type="password"
            autoComplete="off"
            placeholder="enter confirm password"
          ></TextField>

          {isSignUpFailed && (
            <Text color="red">Registration failed, please try again later</Text>
          )}
          <Stack pt={4}>
            <Text fontSize="12px">
              Already have an account?{' '}
              <Link color="blue" as={NavLink} to="/login">
                Log in
              </Link>
            </Text>
            <Button disabled={formik.isSubmitting} type="submit">
              Sign Up
            </Button>
          </Stack>
        </VStack>
      )}
    </Formik>
  );
};
export default SignUpPage;

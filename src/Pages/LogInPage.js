// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Text, useBoolean, VStack } from '@chakra-ui/react';
import TextField from 'components/Common/InputText';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginModal = () => {
  const [isLoginFailed, setLoginFail] = useBoolean();
  const errorMessageTimeOut = useRef(null);
  const navigate = useNavigate();
  const clearErrorMessage = () => {
    clearTimeout(errorMessageTimeOut);
  };
  useEffect(() => {
    errorMessageTimeOut.current = setTimeout(() => {
      setLoginFail.off();
    }, 2000);
    return () => {
      clearErrorMessage(errorMessageTimeOut);
    };
  }, [isLoginFailed, setLoginFail]);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    isName: yup.boolean(),
    email: yup.string().email('invalid email').required('email is required!'),

    password: yup
      .string()
      .min(6, 'Password is too short')
      .required('Password is required!'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      handle
      onSubmit={async (values, actions) => {
        try {
          await dispatch(authOperations.logIn(values));
          actions.resetForm();
          navigate('/contacts', { replace: true });
        } catch (error) {
          actions.setSubmitting(false);
          setLoginFail.on();
        }
      }}
    >
      {formik => (
        <VStack
          as="form"
          mx="auto"
          py={5}
          w={{ base: '90%' }}
          justifyContent="center"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="email"
            placeholder="enter email"
            type="email"
            autoComplete="on"
          ></TextField>
          <TextField
            name="password"
            type="password"
            autoComplete="on"
            placeholder="enter password"
          ></TextField>
          {isLoginFailed}
          {isLoginFailed && (
            <Text color="red"> Wrong email/password combination</Text>
          )}

          <Box as="p" pt={4}>
            <Button disabled={formik.isSubmitting} type="submit">
              Log In
            </Button>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Text,
  Link,
  useBoolean,
  VStack,
  Stack,
} from '@chakra-ui/react';
import TextField from 'components/Common/InputText';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logIn } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { Loader } from 'components/Loader/Loader';

const LoginPage = () => {
  const [isLoginFailed, setLoginFail] = useBoolean();
  const errorMessageTimeOut = useRef(null);
  const navigate = useNavigate();
  const { isRefreshing } = useAuth();
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
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          handle
          onSubmit={async (values, actions) => {
            console.log('values: ', values);
            try {
              await dispatch(logIn(values));
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
              w={{ base: '90%', md: 400 }}
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

              <Stack pt={4}>
                <Text fontSize="12px">
                  Don't have an account?{' '}
                  <Link color="blue" as={NavLink} to="/signup">
                    Sign Up
                  </Link>
                </Text>
                <Button disabled={formik.isSubmitting} type="submit">
                  Log In
                </Button>
              </Stack>
            </VStack>
          )}
        </Formik>
      )}
    </>
  );
};
export default LoginPage;

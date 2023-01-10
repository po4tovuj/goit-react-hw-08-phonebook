import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks';
import { NavLink } from 'react-router-dom';
export const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Container maxW={'container.xl'} p={'20px'}>
      <Heading as="h1" size={['xl', '3xl']} mb={8} textAlign="center">
        Wellcome to the phonebook application
      </Heading>
      <Box as="section">
        {isLoggedIn ? (
          <Text textAlign="center" fontSize="lg">
            Check your{' '}
            <Link as={NavLink} color="blue" to="/contacts">
              contacts list.
            </Link>{' '}
            You could add, remove or update your contacts. Its easy to find
            contact by name
          </Text>
        ) : (
          <Text>
            This could become your favourite phonebook! To use full
            functionality of our application, please,{' '}
            <Link color="blue" as={NavLink} to="/signup">
              Create an account
            </Link>{' '}
            or{' '}
            <Link color="blue" as={NavLink} to="/login">
              Log in
            </Link>{' '}
            to your account
          </Text>
        )}
      </Box>
    </Container>
  );
};

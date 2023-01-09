import { Box, Button, Container, HStack, Image, Link } from '@chakra-ui/react';
import { AuthBar } from 'components/AuthBar/AuthBar';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useAuth } from 'hooks';
import logo from 'images/custom.ico';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor={'#fefefe'}
      borderStyle="solid"
      boxShadow="base"
    >
      <Container maxW={'container.xl'} p={'20px'}>
        <HStack as="nav" justifyContent="space-between">
          <HStack>
            <Link as={NavLink} to="/">
              <Image w={'40px'} src={logo} alt="phonebook" />
            </Link>
            {isLoggedIn && (
              <Link
                _hover={{ textDecoration: 'none' }}
                _activeLink={{
                  pointerEvents: 'none',
                  '& > button': { background: '#3b6deb', color: 'white' },
                }}
                as={NavLink}
                to="/contacts"
              >
                <Button>Contacts</Button>
              </Link>
            )}
          </HStack>
          {isLoggedIn ? <UserMenu /> : <AuthBar />}
        </HStack>
      </Container>
    </Box>
  );
};

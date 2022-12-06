import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Image,
  Link,
} from '@chakra-ui/react';
import { AuthBar } from 'components/AuthBar/AuthBar';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useAuth } from 'hooks';
import logo from 'images/custom.ico';

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
        <HStack as="nav" justifyContent="flex-end">
          <Image mr="auto" w={'40px'} src={logo} alt="phonebook" />
          {isLoggedIn ? <UserMenu /> : <AuthBar />}
        </HStack>
      </Container>
    </Box>
  );
};

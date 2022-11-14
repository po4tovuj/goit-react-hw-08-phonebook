import { Box, Container, Image } from '@chakra-ui/react';

import logo from 'images/custom.ico';
export const Header = () => {
  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor={'#fefefe'}
      borderStyle="solid"
      boxShadow="base"
    >
      <Container maxW={'container.xl'} p={'20px'}>
        <Image w={'40px'} src={logo} alt="phonebook" />
      </Container>
    </Box>
  );
};

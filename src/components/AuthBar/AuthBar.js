import { Button, ButtonGroup, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const AuthBar = () => {
  return (
    <ButtonGroup>
      <Link
        _hover={{ textDecoration: 'none' }}
        _activeLink={{
          pointerEvents: 'none',
          '& > button': { background: '#3b6deb', color: 'white' },
        }}
        as={NavLink}
        to="/login"
      >
        <Button> Log In</Button>
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        _activeLink={{
          pointerEvents: 'none',

          '& > button': { background: '#3b6deb', color: 'white' },
        }}
        as={NavLink}
        to="/signup"
      >
        <Button> Sign Up</Button>
      </Link>
    </ButtonGroup>
  );
};

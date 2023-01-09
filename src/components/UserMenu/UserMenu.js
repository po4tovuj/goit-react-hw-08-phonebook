import { Button, HStack, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
export const UserMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <HStack ml="auto">
      <Text>{user.name}</Text>
      <Button onClick={handleLogOut}>Log Out</Button>
    </HStack>
  );
};

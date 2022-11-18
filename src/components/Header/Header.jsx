import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Image,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';
import CustomModal from 'components/Modals/AuthModal';
import { LoginModal } from 'components/Modals/LoginModal';
import { SignUpModal } from 'components/Modals/SignUpModal';
import logo from 'images/custom.ico';
export const Header = () => {
  const [isLoginForm, setIsLoginForm] = useBoolean();
  const onSubmit = props => {
    console.log('props: ', props);
  };
  const { onOpen, isOpen, onClose } = useDisclosure();
  const loginFormModal = useDisclosure();
  const signUpFormModal = useDisclosure();
  const handleLogIn = () => {};
  const handleSignUp = () => {
    onClose();
  };
  const openModal = status => {
    setIsLoginForm[status]();
    onOpen();
  };
  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor={'#fefefe'}
      borderStyle="solid"
      boxShadow="base"
    >
      <Container maxW={'container.xl'} p={'20px'}>
        <HStack justifyContent="flex-end">
          <Image mr="auto" w={'40px'} src={logo} alt="phonebook" />
          <ButtonGroup>
            <Button onClick={() => openModal('on')}>Log In</Button>
            <Button onClick={() => openModal('off')}>Sign Up</Button>
          </ButtonGroup>
        </HStack>
        {/* <Modal isOpen={loginFormModal.onOpen}> */}
        <CustomModal
          isOpen={isOpen}
          handleClose={onClose}
          title={isLoginForm ? 'Log In' : 'Sign Up'}
        >
          {isLoginForm ? (
            <LoginModal />
          ) : (
            <SignUpModal callback={handleSignUp} />
          )}
        </CustomModal>
        <CustomModal
          isOpen={signUpFormModal.isOpen}
          handleClose={signUpFormModal.onClose}
          title="Sign Up"
        >
          <SignUpModal callback={handleSignUp} />
        </CustomModal>
      </Container>
    </Box>
  );
};

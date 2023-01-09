import { Box, Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <Box width="100%" height="100%">
      <Spinner
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50% -50%)"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

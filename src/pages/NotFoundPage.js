import { Box, Link } from '@chakra-ui/react';
import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Box height="100%" width="100%">
        <Box
          fontSize={32}
          sx={{
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        >
          Page not found. Go to{' '}
          <Link color="blue.500" as={NavLink} to="/">
            Home Page
          </Link>
        </Box>
      </Box>
    </Suspense>
  );
}

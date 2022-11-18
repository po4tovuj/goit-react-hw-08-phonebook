import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import { useState } from 'react';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl
      isInvalid={meta.error && meta.touched}
      errorBorderColor="red.300"
    >
      <FormLabel>{label}</FormLabel>
      {props.type !== 'password' ? (
        <Field as={Input} {...field} {...props} />
      ) : (
        <InputGroup size="md">
          <Field
            as={Input}
            {...field}
            {...props}
            type={show ? 'text' : 'password'}
            pr="4.5rem"
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;

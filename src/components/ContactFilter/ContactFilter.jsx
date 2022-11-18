import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
export const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <Stack>
      <InputGroup size="md" maxW="50rem">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<SearchIcon />}
        />
        <Input
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
          placeholder="Filter your contacts"
        />
      </InputGroup>
    </Stack>
    // <Label htmlFor="filterInput">
    //   Find contacts by name
    // 	<Input>

    // 	</Input>
    //   <Input
    //     id="filterInput"
    //     type="text"
    //
    //   />
    // </Label>
  );
};
ContactFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/actions';
import { getFilter } from 'redux/selectors';
import { Input, Label } from '../CommonStyledComponents';
export const ContactFilter = ({ filterQuery, onFilterChange }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <Label htmlFor="filterInput">
      Find contacts by name
      <Input
        id="filterInput"
        type="text"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </Label>
  );
};
ContactFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

import PropTypes from 'prop-types';
import { Input, Label } from '../CommonStyledComponents';
export const ContactFilter = ({ filterQuery, onFilterChange }) => {
  return (
    <Label htmlFor="filterInput">
      Find contacts by name
      <Input
        id="filterInput"
        type="text"
        value={filterQuery}
        onChange={e => onFilterChange(e.target.value)}
      />
    </Label>
  );
};
ContactFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

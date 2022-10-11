// import { Component } from 'react';
import PropTypes from 'prop-types';
import { Contact, DeleteBtn } from './ContactItem.styled';

export const ContactItem = ({
  id,
  name = '',
  number = '',
  handleDelete = () => ({}),
}) => {
  return (
    <li>
      <Contact>
        {name}: {number}
        <DeleteBtn onClick={() => handleDelete(id)}>Delete</DeleteBtn>
      </Contact>
    </li>
  );
};
ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
};

// export class ContactItemOld extends Component {
//   static defaultPropTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     number: PropTypes.number.isRequired,
//     handleDelete: PropTypes.func,
//   };
//   static defaultProps = {
//     name: '',
//     number: '',
//     id: '',
//     handleDelete: () => ({}),
//   };
//   onDeleteClick = () => {
//     this.props.handleDelete(this.props.id);
//   };
//   render() {
//     const { name, number } = this.props;
//     return (
//       <li>
//         <Contact>
//           {name}: {number}
//           <DeleteBtn onClick={this.onDeleteClick}> Delete </DeleteBtn>
//         </Contact>
//       </li>
//     );
//   }
// }

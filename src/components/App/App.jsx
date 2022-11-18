// import { useState } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { Section } from 'components/Section/Section';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAll } from 'redux/operations';
import { getIsLoading, getContactsError } from 'redux/selectors';
import authOperations from 'redux/auth/auth-operations';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getContactsError);
  useEffect(() => {
    const getUser = async () => {
      const user = await dispatch(authOperations.fetchCurrentUser());
      if (user) {
        dispatch(fetchAll);
      }
    };
    getUser();
    // dispatch(fetchAll());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound> Page Not Found</NotFound>} />
    </Routes>

    // <Container maxW={'container.xl'} p={'20px'}>
    //   <Section title="Contact List">
    //     {isLoading && !error && <b>Updating contacts...</b>}
    //     {error && <b>Something bad happened... ${error}</b>}
    //     <ContactFilter />
    //     <ContactsList />
    //   </Section>
    //   <Section title="PhoneBook">
    //     <ContactForm />
    //   </Section>
    // </Container>
  );
};
// export class App extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };
//   componentDidMount() {
//     this.setState({ contacts: this.getContactFromStorage() });
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       this.updateContactsInLocalStorage();
//     }
//   }
//   handleDelete = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };
//   onSubmit = contact => {
//     const isAlreadyExist = this.state.contacts.find(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );
//     if (isAlreadyExist) {
//       throw new Error(`${contact.name} is already in contacts`);
//     }
//     this.setState(prevState => {
//       return {
//         contacts: [
//           ...prevState.contacts,
//           { ...contact, id: shortid.generate() },
//         ],
//       };
//     });
//   };
//   getContactFromStorage = () => {
//     const contacts = ;
//     return contacts ? JSON.parse(contacts) : [];
//   };
//   updateContactsInLocalStorage() {
//     localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
//   }

//   onFilterChange = e => {
//     const { value } = e.target;

//     this.setState({ filterQuery: value });
//   };
//   filterContacts = () => {
//     const normalizeFilter = this.state.filterQuery.toLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   render() {
//     const filteredContacts = this.filterContacts();

//     return (
//       <Container>
//         <Section title="PhoneBook">
//           <ContactForm onSubmit={this.onSubmit} />
//         </Section>
//         <Section title="Contact List">
//           <ContactFilter
//             onFilterChange={this.onFilterChange}
//             filterQuery={this.state.filter}
//           />
//           <ContactsList
//             contacts={filteredContacts}
//             handleDelete={this.handleDelete}
//           />
//         </Section>
//       </Container>
//     );
//   }
// }

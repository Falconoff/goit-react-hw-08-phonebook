import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { getFilterValue } from '../../redux/filter/filterSlice';
import { useFetchContactsQuery } from '../../redux/contacts/contactsApi';

import ContactsListItem from './ListItem';

import { ContactsList } from './Contacts.styled';

export default function Contacts() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const {
    data: contacts,
    error,
    isLoading,
    isUninitialized,
  } = useFetchContactsQuery({ refetchOnMountOrArgChange: isLoggedIn });
  // useFetchContactsQuery()

  console.log('Contacts - isLoggedIn:', isLoggedIn);
  // fetchContacts();

  // for filter
  const filter = useSelector(getFilterValue);
  const normalizedFilter = filter.toLowerCase();
  let filteredContacts = [];
  if (contacts) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  if (error?.data) {
    // toast.error(`Error: ${error.data.message}`);
    console.log('CONSOLE ERROR message:', error.data.message);
  }

  // if (isUninitialized && error) {
  //   // toast.error(`Error: ${error.data}`);
  //   console.log('CONSOLE isUninitialized & error', error);
  // }

  // console.log('CONSOLE isUninitialized ', isUninitialized);
  // console.log('CONSOLE error', error);
  console.log('CONSOLE isLoading', isLoading);

  // if (isLoading) {
  //   console.log('CONSOLE isLoading');
  // }

  return (
    <ContactsList>
      {isLoading && <p>Loading...</p>}
      {contacts &&
        filteredContacts.map(contact => (
          <ContactsListItem key={contact.id} {...contact} />
        ))}
    </ContactsList>
  );
}

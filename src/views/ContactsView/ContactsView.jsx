import Form from 'components/Form';
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';

export default function ContactsView() {
  return (
    <>
      <h1 style={{ color: 'red', padding: '1rem' }}>Page - Contacts</h1>
      <Form />
      {/* <TitleSecond>Contacts</TitleSecond> */}
      <Filter />
      <Contacts />
    </>
  );
}

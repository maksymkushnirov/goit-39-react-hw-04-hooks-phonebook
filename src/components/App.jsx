import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? contactList);

  useEffect(() => { localStorage.setItem('contacts', JSON.stringify(contacts)); }, [contacts]);


  
  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(
      prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  return (
    <div className="container">
      <h2 className="container-name">Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <div>
        <h2 className="container-name">Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          filterContacts={getFilterContacts()}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
  
};
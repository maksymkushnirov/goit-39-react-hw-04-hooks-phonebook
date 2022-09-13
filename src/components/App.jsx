import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
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
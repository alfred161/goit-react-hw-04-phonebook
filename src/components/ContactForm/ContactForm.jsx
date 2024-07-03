import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ContactForm.module.css';

export const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    if (number.trim() === '') {
      alert('Please enter a number.');
      return;
    }

    const contactExists = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    addContact({
      id: nanoid(),
      name: name,
      number: number,
    });
  };

  return (
    <form className={style.form} onSubmit={e => handleSubmit(e)}>
      <label>
        <p>Name</p>
        <input
          id={style.name}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          value={name}
          onChange={e => setName(e.target.value)}
          required
          autoFocus
        />
      </label>
      <label>
        <p>Number</p>
        <input
          id={style.number}
          type="tel"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
      </label>
      <button className={style.btn}>Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  addContact: PropTypes.func.isRequired,
};

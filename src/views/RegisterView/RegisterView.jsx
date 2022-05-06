import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { useRegisterUserMutation } from '../../redux/auth/authApi';
import registerErrors from '../../services/registerErrors';

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();

  const [registerUser, { data, isSuccess, error, isLoading }] =
    useRegisterUserMutation();

  console.log('data', data);

  useEffect(() => {
    registerErrors(error);
  }, [error]);
  //

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    registerUser({ name, email, password });

    console.log('handleSubmit:', { name, email, password });
    if (isSuccess) {
      toast.success('Successfully registered!');
    }
    // setEmail('');
    // setPassword('');
  };

  return (
    <div>
      <h1 style={{ color: 'red', padding: '1rem' }}>Page - Register</h1>

      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

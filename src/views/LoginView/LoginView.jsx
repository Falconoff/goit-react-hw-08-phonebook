import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  useLoginUserMutation,
  useGetUserQuery,
  authAction,
} from '../../redux/auth/authApi';
// import registerErrors from '../../services/registerErrors';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [loginUser, { data, isSuccess, error, isLoading }] =
    useLoginUserMutation();

  // console.log('data in LoginView:', data);

  // const qwe = dispatch(authAction());

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
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
    loginUser({ email, password });
    console.log('handleSubmit:', { email, password });
    // setEmail('');
    // setPassword('');
  };

  return (
    <div>
      <h1 style={{ color: 'red', padding: '1rem' }}>Page - Login</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
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
          Log In
        </button>
      </form>
    </div>
  );
}

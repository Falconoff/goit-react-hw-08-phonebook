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

    loginAndSaveToState({ email, password });

    console.log('handleSubmit:', { email, password });

    setEmail('');
    setPassword('');
  };

  // login user by RTK and then save it to State by Slice
  const loginAndSaveToState = async user => {
    const returnedUser = await loginUser(user, {
      selectFromResult: ({ data }) => data.user,
    });

    dispatch(authAction(returnedUser));
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

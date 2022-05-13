import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  useLoginUserMutation,
  useGetUserQuery,
  loginAction,
} from '../../redux/auth/authApi';
import registerErrors from '../../services/registerErrors';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [loginUser, { data, isSuccess, error, isLoading }] =
    useLoginUserMutation();

  useEffect(() => {
    registerErrors(error);
  }, [error]);

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

    if (isSuccess) {
      setEmail('');
      setPassword('');
    }
  };

  // console.log('LoginView - isLoading:', isLoading);
  // console.log('LoginView - isSuccess:', isSuccess);
  // console.log('LoginView - error:', error);
  // console.log('LoginView - data:', data);

  // login user by RTK and then save it to State by Slice
  const loginAndSaveToState = async user => {
    try {
      const returnedUser = await loginUser(user, {
        selectFromResult: ({ data }) => data.user,
      });
      dispatch(loginAction(returnedUser));
      // console.log('LoginView - returnedUser:', returnedUser);
    } catch (error) {
      toast.error('Wrong e-mail or password');
      // console.log(
      //   'ERROR - LoginView - Wrong e-mail or password. Error:',
      //   error.message
      // );
    }
  };

  return (
    <div>
      <h1 style={{ color: 'red', padding: '1rem' }}>Page - Login</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
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
        </div>
        <div>
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
        </div>

        <button type="submit" disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
}

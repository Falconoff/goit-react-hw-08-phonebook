import { useDispatch, useSelector } from 'react-redux';
import {
  getUserName,
  useLogoutUserMutation,
  logoutAction,
} from '../../redux/auth/authApi';

export default function UserMenu() {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('STATE_isLoggedIn:', isLoggedIn);
  const name = useSelector(state => state.auth.user.name);
  console.log('STATE_name:', name);
  const token = useSelector(state => state.auth.token);
  console.log('STATE_token:', token);

  // logout user by RTK and then save it to State by Slice
  const logoutAndSaveToState = async () => {
    await logoutUser();
    dispatch(logoutAction());
  };

  return (
    <>
      <span>Welcome, {name}</span>

      <button type="button" onClick={logoutAndSaveToState}>
        Log Out
      </button>
    </>
  );
}

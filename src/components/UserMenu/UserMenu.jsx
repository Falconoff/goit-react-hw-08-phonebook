import { useDispatch, useSelector } from 'react-redux';
import {
  getUserName,
  useLogoutUserMutation,
  logoutAction,
} from '../../redux/auth/authApi';

export default function UserMenu() {
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const name = useSelector(state => state.auth.user.name);
  // const name = 'xXx ';

  // logout user by RTK and then save it to State by Slice
  const logoutAndSaveToState = async () => {
    await logoutUser();
    dispatch(logoutAction());
  };

  return (
    <>
      <span>Welcome, {name} </span>

      <button type="button" onClick={logoutAndSaveToState}>
        Log Out
      </button>
    </>
  );
}

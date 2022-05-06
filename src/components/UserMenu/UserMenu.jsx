import { useDispatch, useSelector } from 'react-redux';
import { getUserName, useLogoutUserMutation } from '../../redux/auth/authApi';

export default function UserMenu() {
  const dispatch = useDispatch();
  // const name = useSelector(state => state.auth.user.name);
  const name = useSelector(state => state.auth.mutations);
  const [logoutUser] = useLogoutUserMutation();

  console.log('STATE:', name);
  return (
    <>
      {/* <span>Добро пожаловать, {name}</span> */}
      <span>Добро пожаловать</span>

      <button type="button" onClick={logoutUser}>
        Выйти
      </button>
    </>
  );
}

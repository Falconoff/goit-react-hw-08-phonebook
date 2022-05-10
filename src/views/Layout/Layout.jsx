// import { is } from 'immer/dist/internal';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import UserMenu from '../../components/UserMenu/UserMenu';

import { useFetchCurrentUserQuery } from '../../redux/auth/authApi';

import { Header, Link, Footer, MainWrapper } from './Layout.styled';

export default function Layout() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  /*
  const token = useSelector(state => state.auth.token);
  const isToken = token !== null;
  console.log('Layout - token:', token);
  console.log('Layout - isTOKEN:', isToken);

  const {
    data: contacts,
    error,
    isLoading,
    isUninitialized,
  } = useFetchCurrentUserQuery();
  //{ skip: !isToken }
  console.log('Layout - contacts:', contacts);
*/
  return (
    <>
      <Header>
        {!isLoggedIn && <Link to="/register">register</Link>}
        {!isLoggedIn && <Link to="/login">login</Link>}

        <Link to="/contacts">contacts</Link>
        {/* {isLoggedIn && <Link to="/contacts">contacts</Link>} */}
        {isLoggedIn && <UserMenu />}
      </Header>

      <MainWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </MainWrapper>

      <Footer>2022, GoIT Homework - Phonebook, Falconoff ©</Footer>
    </>
  );
}

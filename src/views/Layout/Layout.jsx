// import { is } from 'immer/dist/internal';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import UserMenu from '../../components/UserMenu/UserMenu';

import { Header, Link, Footer, MainWrapper } from './Layout.styled';

export default function Layout() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <Header>
        {!isLoggedIn && <Link to="/register">register</Link>}
        {!isLoggedIn && <Link to="/login">login</Link>}

        {isLoggedIn && <Link to="/contacts">contacts</Link>}
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

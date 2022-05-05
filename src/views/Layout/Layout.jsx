import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Header, Link, Footer, MainWrapper } from './Layout.styled';

export default function Layout() {
  return (
    <>
      <Header>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
        <Link to="/contacts">contacts</Link>
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

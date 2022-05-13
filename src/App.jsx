import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Layout from './views/Layout/Layout';
import Contacts from './views/ContactsView/ContactsView';
import Login from 'views/LoginView/LoginView';
import Register from 'views/RegisterView/RegisterView';
import HomeView from 'views/HomeView/HomeView';

// import Form from '../Form';
// import Contacts from '../Contacts';
// import Filter from '../Filter';

import {
  useFetchCurrentUserQuery,
  useTempFetchCurrentUserMutation,
  getCurrentUserAction,
} from './redux/auth/authApi';

// import { authSlice } from './redux/auth/authSlice';

// import { Container, TitleMain, TitleSecond } from './App.styled';
import { Container } from './App.styled';
import { useEffect } from 'react';

function App() {
  const token = useSelector(state => state.auth.token);
  const isToken = token !== null;
  // console.log('App - token:', token);
  console.log('App - isTOKEN:', isToken);

  // ================  КВЕРИ-ХУК  ==============
  const dispatch = useDispatch();

  const {
    data: result,
    isSuccess,
    isLoading,
  } = useFetchCurrentUserQuery({
    skip: true,
  });

  useEffect(() => {
    if (isSuccess) dispatch(getCurrentUserAction(result));
  }, [isSuccess, result]);

  // console.log('App - data:', data);
  // console.log('App - result:', result);
  // console.log('isLoading', isLoading);

  return (
    <Container>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

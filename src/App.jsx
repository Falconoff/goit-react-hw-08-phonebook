import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Layout from './views/Layout/Layout';
import Contacts from './views/ContactsView/ContactsView';
import Login from 'views/LoginView/LoginView';
import Register from 'views/RegisterView/RegisterView';
import HomeView from 'views/HomeView/HomeView';
import PrivateRoute from 'views/Routes/PrivateRoute';
import PublicRoute from 'views/Routes/PublicRoute';

import {
  useFetchCurrentUserQuery,
  getCurrentUserAction,
} from './redux/auth/authApi';

import { Container } from './App.styled';
import { useEffect } from 'react';

function App() {
  const token = useSelector(state => state.auth.token);
  const isToken = token !== null;

  const dispatch = useDispatch();

  const {
    data: result,
    isSuccess,
    isLoading,
  } = useFetchCurrentUserQuery({
    skip: true,
    // skip: !isToken,
  });

  useEffect(() => {
    if (isSuccess) dispatch(getCurrentUserAction(result));
  }, [isSuccess, result]);

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
          {/* <Route
            index
            element={<PublicRoute> <HomeView /> </PublicRoute>}
          /> */}
          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

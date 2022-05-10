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

import { useFetchCurrentUserQuery } from './redux/auth/authApi';

// import { Container, TitleMain, TitleSecond } from './App.styled';
import { Container } from './App.styled';

function App() {
  const token = useSelector(state => state.auth.token);
  const isToken = token !== null;
  console.log('App - token:', token);
  console.log('App - isTOKEN:', isToken);

  const {
    data: contacts,
    error,
    isLoading,
    isUninitialized,
  } = useFetchCurrentUserQuery();
  //{ skip: !isToken }
  console.log('App - contacts:', contacts);
  console.log('App!!!!!!!!!!!!!!');

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

          {/* <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<HomePage />} /> */}
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

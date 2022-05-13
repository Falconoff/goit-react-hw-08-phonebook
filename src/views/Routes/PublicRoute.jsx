import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

export default function PublicRoute({
  children,
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  // console.log('shouldRedirect:', shouldRedirect);
  // if (!shouldRedirect) {
  //   toast.error('You have to Login or Register');
  // }
  return shouldRedirect ? <Navigate to="/contacts" /> : children;
  // return children;
}

import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({
  component: Component,
  redirectTo = '/',
  restricted = false,
}) {
  const { isLoggedIn } = useAuth();
  const shouldRedirect = isLoggedIn && !restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
}

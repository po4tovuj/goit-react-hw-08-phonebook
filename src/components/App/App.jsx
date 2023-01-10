// import { useState } from 'react';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage';
import PrivateRoute from 'components/PrivateRoute';
import RestrictedRoute from 'components/RestrictedRoute';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import NotFoundPage from 'pages/NotFoundPage';
import { Loader } from 'components/Loader/Loader';
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LogInPage'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage'));
export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" index element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute
              component={SignUpPage}
              redirectTo="/contacts"
              replace={true}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              component={LoginPage}
              redirectTo="/contacts"
              replace={true}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute component={ContactsPage} redirectTo="/login" />
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

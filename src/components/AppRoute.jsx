import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../useAuth.js';

const AppRoute = ({ children, path, isPrivate }) => {
  const auth = useAuth();

  const renderPrivateRoute = ({ location }) => (
    (auth.isAuth) ? (
      children
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    ));

  const renderPublicRoute = ({ location }) => (
    (auth.isAuth) ? (
      <Redirect to={{ pathname: '/', state: { from: location } }} />
    ) : (
      children
    ));

  return (
    <Route
      path={path}
      render={isPrivate ? renderPrivateRoute : renderPublicRoute}
    />
  );
};

export default AppRoute;

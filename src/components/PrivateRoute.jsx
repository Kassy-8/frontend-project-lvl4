import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import useAuth from '../useAuth.js';

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (
        (auth.userLoggedIn)
          ? children
          : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    />
  );
};

export default PrivateRoute;

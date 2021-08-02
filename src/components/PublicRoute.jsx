import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import useAuth from '../useAuth.js';

const PublicRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (
        (auth.userLoggedIn)
          ? <Redirect to={{ pathname: '/', state: { from: location } }} />
          : children
      )}
    />
  );
};

export default PublicRoute;

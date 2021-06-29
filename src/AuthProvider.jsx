import React, { useState } from 'react';
import authContext from './authContext.jsx';

const AuthProvider = ({ children }) => {
  const [userLoggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => setLoggedIn(false);

  return (
    <authContext.Provider value={{ userLoggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

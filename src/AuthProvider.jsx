import React, { useState } from 'react';
import authContext from './authContext.js';

const AuthProvider = ({ children }) => {
  const [{
    userLoggedIn, username,
  }, setLoggedIn] = useState({ userLoggedIn: false, username: null });

  const logIn = (user) => setLoggedIn({ userLoggedIn: true, username: user });
  const logOut = () => setLoggedIn({ userLoggedIn: false, username: null });

  return (
    <authContext.Provider value={{
      userLoggedIn, username, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

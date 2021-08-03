import React, { useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import authContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const [
    {
      userLoggedIn, user,
    },
    setLoggedIn] = useState({ userLoggedIn: false, user: null });

  const logIn = async (values) => {
    const { username, password } = values;
    const response = await axios.post(routes.loginPath(), { username, password });

    const token = JSON.stringify(response.data);
    localStorage.setItem('userId', token);
    setLoggedIn({ userLoggedIn: true, user: response.data.username });
  };

  const signUp = async (values) => {
    const { username, password } = values;
    const response = await axios.post(routes.signupPath(), { username, password });

    const token = JSON.stringify(response.data);
    localStorage.setItem('userId', token);
    setLoggedIn({ userLoggedIn: true, user: response.data.username });
  };

  const logOut = () => setLoggedIn({ userLoggedIn: false, user: null });

  return (
    <authContext.Provider value={{
      userLoggedIn, username: user, logIn, logOut, signUp,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

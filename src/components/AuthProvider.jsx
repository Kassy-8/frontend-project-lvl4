import React, { useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import authContext from '../contexts/authContext.js';

const AuthProvider = ({ children }) => {
  const [{ isAuth, user }, setLoggedIn] = useState({
    isAuth: false,
    user: null,
  });

  const logIn = async (values) => {
    const { username, password } = values;
    const response = await axios.post(routes.loginPath(), { username, password });

    const authData = JSON.stringify(response.data);
    localStorage.setItem('userId', authData);
    setLoggedIn({ isAuth: true, user: response.data.username });
  };

  const signUp = async (values) => {
    const { username, password } = values;
    const response = await axios.post(routes.signupPath(), { username, password });

    const authData = JSON.stringify(response.data);
    localStorage.setItem('userId', authData);
    setLoggedIn({ isAuth: true, user: response.data.username });
  };

  const logOut = () => setLoggedIn({ isAuth: false, user: null });

  const getHeaderForAuth = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  return (
    <authContext.Provider
      value={{
        isAuth,
        username: user,
        logIn,
        logOut,
        signUp,
        getHeaderForAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import AppRoute from './AppRoute.jsx';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import Page404 from '../pages/Page404.jsx';

const AppRouter = () => (
  <Router>
    <Switch>
      <AppRoute path="/login" isPrivate={false}>
        <LoginPage />
      </AppRoute>
      <AppRoute path="/signup" isPrivate={false}>
        <RegistrationPage />
      </AppRoute>
      <AppRoute exact path="/" isPrivate>
        <ChatPage />
      </AppRoute>
      <AppRoute path="*" isPrivate={false}>
        <Page404 />
      </AppRoute>
    </Switch>
  </Router>
);

export default AppRouter;

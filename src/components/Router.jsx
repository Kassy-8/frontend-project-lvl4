import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import Registration from '../pages/Registration.jsx';
import Page404 from '../pages/Page404.jsx';

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/login">
        <LoginPage />
      </PublicRoute>
      <PublicRoute path="/signup">
        <Registration />
      </PublicRoute>
      <PrivateRoute exact path="/">
        <ChatPage />
      </PrivateRoute>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;

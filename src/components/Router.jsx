import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AuthProvider from './AuthProvider.jsx';
import LoginPage from './LoginPage.jsx';
import Chat from './Chat.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Registration from './Registration.jsx';
import Header from './Header.jsx';
import NoMatchPage from './NoMatchPage.jsx';

const AppRouter = () => (
  <AuthProvider>
    <Container fluid className="h-100">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <Registration />
          </Route>
          <PrivateRoute exact path="/">
            <Chat />
          </PrivateRoute>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  </AuthProvider>
);

export default AppRouter;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Col, Container, Navbar, Row } from 'react-bootstrap';
import AuthProvider from './AuthProvider.jsx';
import useAuth from './useAuth.js';
import LoginPage from './LoginPage.jsx';
import Chat from './Chat.jsx';

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

const NoMatchPage = () => (
  <div>
    <span>
      Sorry, no such page, but you can go back to main page!
    </span>
  </div>
);
// Кнопка появляется когда пользователь залогинился, иначе null
const AppRouter = () => (
  <AuthProvider>
    <Container fluid className="h-100">
      <Router>
        <Row>
          <Col>
            <Navbar className="justify-content-between">
              <Navbar.Brand as={Link} to="/">
                Hexlet-Chat
              </Navbar.Brand>
              <Button>
                Выйти
              </Button>
            </Navbar>
          </Col>
        </Row>
        <Switch>
          <Route path="/login">
            <LoginPage />
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

/*
const AppRouter = () => (
  <AuthProvider>
    <Container fluid className="h-100">
      <Router>
        <Row>
          <Col>
            <Navbar className="justify-content-between">
              <Navbar.Brand as={Link} to="/">
                Hexlet-Chat
              </Navbar.Brand>
              <Button>
                Выйти
              </Button>
            </Navbar>
          </Col>
        </Row>
        <Switch>
          <Route path="/login">
            <LoginPage />
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

*/

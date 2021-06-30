import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import AuthProvider from './AuthProvider.jsx';
import useAuth from './useAuth.jsx';
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

// const Chat = () => (
//   <div>
//     <span>
//       The Chat will be there soon
//     </span>
//   </div>
// );

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <Navbar>
        <Navbar.Brand as={Link} to="/">
          Hexlet-Chat
        </Navbar.Brand>
        <Button>
          Выйти
        </Button>
      </Navbar>

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
  </AuthProvider>
);

export default AppRouter;

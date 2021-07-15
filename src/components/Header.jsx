import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Button, Col, Navbar, Row,
} from 'react-bootstrap';
import useAuth from '../useAuth.js';

const Header = () => {
  const auth = useAuth();
  return (
    <Row>
      <Col>
        <Navbar className="justify-content-between">
          <Navbar.Brand as={Link} to="/">
            Hexlet-Chat
          </Navbar.Brand>
          {(auth.userLoggedIn)
            ? (
              <Button onClick={() => auth.logOut()}>
                Выйти
              </Button>
            )
            : null}
        </Navbar>
      </Col>
    </Row>
  );
};

export default Header;

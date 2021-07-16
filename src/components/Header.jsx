import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col, Navbar, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <Row>
      <Col>
        <Navbar className="justify-content-between">
          <Navbar.Brand as={Link} to="/">
            {t('header.title')}
          </Navbar.Brand>
          {(auth.userLoggedIn)
            ? (
              <Button onClick={() => auth.logOut()}>
                {t('header.exitButton')}
              </Button>
            )
            : null}
        </Navbar>
      </Col>
    </Row>
  );
};

export default Header;

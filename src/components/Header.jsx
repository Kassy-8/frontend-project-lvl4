import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <Navbar className="justify-content-between border-bottom">
      <Navbar.Brand as={Link} to="/">
        {t('header.title')}
      </Navbar.Brand>
      {auth.isAuth ? (
        <Button onClick={() => auth.logOut()}>
          {t('header.exitButton')}
        </Button>
      ) : null}
    </Navbar>
  );
};

export default Header;

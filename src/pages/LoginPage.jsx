import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Form, Button, Col, Row, Card, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';
import loginPageImage from '../assets/images/hexlet_chat.jpeg';
import Header from '../components/Header.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const nameInputRef = useRef();

  const [authFailed, setAuthFailed] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnBlur: false,
    validationSchema: yup.object({
      username: yup.string().trim().required(t('auth.validation.required')),
      password: yup.string().trim().required(t('auth.validation.required')),
    }),
    onSubmit: async (values) => {
      try {
        await auth.logIn(values);
      } catch (error) {
        if (error.isAxiosError) {
          if (error.response && error.response.status === 401) {
            setNetworkError(null);
            setAuthFailed(true);
            nameInputRef.current.select();
            return;
          }
          setAuthFailed(false);
          setNetworkError(true);
        }
      }
    },
  });

  const isNameInvalid = (formik.touched.username && formik.errors.username) || authFailed;
  const isPasswordInvalid = (formik.touched.password && formik.errors.password) || authFailed;

  const loginFormNode = (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="mb-4 text-center">{t('auth.loginPage.title')}</h1>
      <Form.Group controlId="username">
        <Form.Label>{t('auth.loginPage.nameLabel')}</Form.Label>
        <Form.Control
          name="username"
          type="name"
          ref={nameInputRef}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          isInvalid={isNameInvalid}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>{t('auth.passwordLabel')}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          isInvalid={isPasswordInvalid}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {(authFailed) && (
        <Form.Text className="text-danger m-2">
          {t('auth.loginPage.failedAuthFeedback')}
        </Form.Text>
      )}
      {(networkError) && (
        <Form.Text className="text-danger m-2">
          {t('networkError')}
        </Form.Text>
      )}
      <div className="d-flex justify-content-center">
        <Button
          className="w-100"
          variant="outline-primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t('auth.loginPage.entranceButton')}
        </Button>
      </div>
    </Form>
  );

  const loginFooterNode = (
    <div className="p-4 d-flex justify-content-center">
      <p className="m-0">
        <span>{t('auth.loginPage.questionNoAcc')}</span>
        {' '}
        <Link to="signup">{t('auth.loginPage.registrationLink')}</Link>
      </p>
    </div>
  );

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col>
            <Card className="shadow-sm">
              <Row className="h-100 p-5 align-items-center justify-content-center">
                <Col className="d-flex justify-content-center">
                  <img src={loginPageImage} className="rounded" alt="loginPageImage" />
                </Col>
                <Col className="mt-3 mb-t-mb-0">
                  {loginFormNode}
                </Col>
              </Row>
              <Card.Footer>
                {loginFooterNode}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

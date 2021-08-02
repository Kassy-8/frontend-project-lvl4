import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Form, Button, Col, Row, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';
import routes from '../routes.js';
import loginPageImage from '../assets/images/hexlet_chat.jpeg';

const LoginPage = () => {
  const nameInputRef = useRef();
  const auth = useAuth();
  const { t } = useTranslation();

  const [authFailed, setAuthFailed] = useState(null);

  const logInUser = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.loginPath(), { username, password });

      const token = JSON.stringify(response.data);
      localStorage.setItem('userId', token);
      auth.logIn(response.data.username);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        setAuthFailed(true);
        nameInputRef.current.select();
        return;
      }
      console.log(error);
      throw error;
    }
  };

  const formikInstance = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(t('loginPage.validation.required')),
      password: yup.string().trim().required(t('loginPage.validation.required')),
    }),
    onSubmit: logInUser,
  });

  const renderLoginForm = (formik) => (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="mb-4 text-center">{t('loginPage.title')}</h1>
      <Form.Group controlId="username">
        <Form.Label>{t('loginPage.nameLabel')}</Form.Label>
        <Form.Control
          name="username"
          type="name"
          ref={nameInputRef}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            (formik.touched.username && formik.errors.username) || (authFailed)
          }
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>{t('loginPage.passwordLabel')}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            (formik.touched.password && formik.errors.password) || (authFailed)
          }
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {(authFailed) && (
        <Form.Text className="text-danger m-2">
          {t('loginPage.failedAuthFeedback')}
        </Form.Text>
      )}
      <div className="d-flex justify-content-center">
        <Button
          className="w-100"
          variant="outline-primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t('loginPage.entranceButton')}
        </Button>
      </div>
    </Form>
  );

  const renderLoginFooter = () => (
    <div className="p-4 d-flex justify-content-center">
      <p className="m-0">
        <span>{t('loginPage.questionNoAcc')}</span>
        {' '}
        <Link to="signup">{t('loginPage.registrationLink')}</Link>
      </p>
    </div>
  );

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <Col>
        <Card className="shadow-sm">
          <Row className="h-100 p-5 align-items-center justify-content-center">
            <Col className="d-flex justify-content-center">
              <img src={loginPageImage} className="rounded" alt="loginPageImage" />
            </Col>
            <Col className="mt-3 mb-t-mb-0">
              {renderLoginForm(formikInstance)}
            </Col>
          </Row>
          <Card.Footer>
            {renderLoginFooter()}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;

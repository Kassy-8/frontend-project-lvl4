import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useLocation, useHistory, Link } from 'react-router-dom';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';
import routes from '../routes.js';

const LoginPage = () => {
  const nameInputRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();

  const [authFailed, setAuthFailed] = useState(false);

  const logInUser = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.loginPath(), { username, password });
      const token = JSON.stringify(response.data);
      localStorage.setItem('userId', token);
      auth.logIn(response.data.username);
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        setAuthFailed(true);
        nameInputRef.current.select();
        // select input with username
        return;
      }
      console.log(error);
      throw error;
    }
  };
  const formik = useFormik({
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

  return (
    <Row className=" h-100 align-items-center justify-content-center">
      <Col xs={12} lg={6}>
        <h1 className="m-2 d-flex justify-content-center">{t('loginPage.title')}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Control
              name="username"
              type="name"
              placeholder={t('loginPage.namePlaceholder')}
              ref={nameInputRef}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.username && formik.errors.username) || (authFailed === true)
              }
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.password && formik.errors.password) || (authFailed === true)
              }
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {(authFailed)
            ? (
              <Form.Text className="text-danger m-2">
                {t('loginPage.failedAuthFeedback')}
              </Form.Text>
            )
            : null}
          <Button variant="outline-primary" type="submit" disabled={formik.isSubmitting}>
            {t('loginPage.entranceButton')}
          </Button>
        </Form>
        <div className="m-2 d-flex justify-content-center">
          <p>
            <span>{t('loginPage.questionNoAcc')}</span>
            {' '}
            <Link to="signup">{t('loginPage.registrationLink')}</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;

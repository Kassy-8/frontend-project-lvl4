import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';
import routes from '../routes.js';

const Registration = () => {
  const { t } = useTranslation();
  const nameInputRef = useRef();
  const history = useHistory();
  const auth = useAuth();

  const [registrationFailed, setRegistrationFailed] = useState(false);

  const signUpUser = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.signupPath(), { username, password });
      const token = JSON.stringify(response.data);
      localStorage.setItem('userId', token);
      auth.logIn(response.data.username);
      history.replace({ pathname: '/' });
    } catch (error) {
      if (error.isAxiosError && error.response.status === 409) {
        setRegistrationFailed(true);
        nameInputRef.current.select();
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
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('registrationPage.validation.required'))
        .min(3, t('registrationPage.validation.nameLength'))
        .max(20, t('registrationPage.validation.nameLength')),
      password: yup.string()
        .required(t('registrationPage.validation.required'))
        .min(6, t('registrationPage.validation.passwordLength')),
      passwordConfirmation: yup.string()
        .required('registrationPage.validation.required')
        .oneOf([yup.ref('password')], t('registrationPage.validation.passwordMatch')),
    }),
    onSubmit: signUpUser,
  });

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <Col xs={12} lg={6}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Control
              name="username"
              type="name"
              placeholder={t('registrationPage.namePlaceholder')}
              ref={nameInputRef}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.username && formik.errors.username)
                || (registrationFailed === true)
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
              placeholder={t('registrationPage.passwordPlaceholder')}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.password && formik.errors.password)
                || (registrationFailed === true)
              }
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Control
              type="password"
              placeholder={t('registrationPage.confirmationPlaceholder')}
              name="passwordConfirmation"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)
                || (registrationFailed === true)
              }
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.passwordConfirmation}
            </Form.Control.Feedback>
          </Form.Group>
          {(registrationFailed)
            ? (
              <Form.Text className="text-danger m-2">
                {t('registrationPage.failedRegustrationFeedback')}
              </Form.Text>
            )
            : null}
          <Button variant="outline-primary" type="submit" disabled={formik.isSubmitting}>
            {t('registrationPage.entranceButton')}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Registration;

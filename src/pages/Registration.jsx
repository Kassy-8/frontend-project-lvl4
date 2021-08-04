import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Form, Button, Col, Row, Card, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.js';
import registrationImage from '../assets/images/registration.jpeg';
import Header from '../components/Header.jsx';

const Registration = () => {
  const { t } = useTranslation();
  const nameInputRef = useRef();
  const auth = useAuth();

  const [registrationFailed, setRegistrationFailed] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnBlur: false,
    validationSchema: yup.object({
      username: yup.string()
        .required(t('auth.validation.required'))
        .min(3, t('auth.validation.nameLength'))
        .max(20, t('auth.validation.nameLength')),
      password: yup.string()
        .required(t('auth.validation.required'))
        .min(6, t('auth.validation.passwordLength')),
      passwordConfirmation: yup.string()
        .required(t('auth.validation.required'))
        .oneOf([yup.ref('password')], t('auth.validation.passwordMatch')),
    }),
    onSubmit: async (values) => {
      try {
        await auth.signUp(values);
      } catch (error) {
        if (error.isAxiosError) {
          if (error.response && error.response.status === 409) {
            setNetworkError(null);
            setRegistrationFailed(true);
            nameInputRef.current.select();
            return;
          }
          setRegistrationFailed(false);
          setNetworkError(true);
        }
      }
    },
  });

  const isNameInvalid = (formik.touched.username && formik.errors.username) || registrationFailed;
  const isPasswordInvalid = (formik.touched.password && formik.errors.password)
    || registrationFailed;
  const isConfirmationInvalid = (formik.touched.passwordConfirmation
      && formik.errors.passwordConfirmation) || registrationFailed;

  const registrationFormNode = (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="mb-4 text-center">{t('auth.registrationPage.title')}</h1>
      <Form.Group controlId="username">
        <Form.Label>{t('auth.registrationPage.nameLabel')}</Form.Label>
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
      <Form.Group controlId="passwordConfirmation">
        <Form.Label>{t('auth.registrationPage.confirmationLabel')}</Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          isInvalid={isConfirmationInvalid}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </Form.Group>
      {(registrationFailed) && (
        <Form.Text className="text-danger m-2">
          {t('auth.registrationPage.failedRegustrationFeedback')}
        </Form.Text>
      )}
      {(networkError) && (
        <Form.Text className="text-danger m-2">
          {t('networkError')}
        </Form.Text>
      )}
      <Button
        className="w-100"
        variant="outline-primary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {t('auth.registrationPage.entranceButton')}
      </Button>
    </Form>
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
                  <img src={registrationImage} className="rounded" alt="registrationPageImage" />
                </Col>
                <Col className="mt-3 mb-t-mb-0">
                  {registrationFormNode}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;

import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useAuth from './useAuth.jsx';
import routes from './routes.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const logInUser = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.loginPath(), { username, password });
      // console.log('data from server', response.data);
      const token = JSON.stringify(response.data);
      localStorage.setItem('userId', token);
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        setAuthFailed(true);
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
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: logInUser,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="username"
          type="name"
          placeholder="Ваш логин"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.touched.username && formik.errors.username) || (authFailed === true)}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Пaроль"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.touched.password && formik.errors.password) || (authFailed === true)}
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
            Неверные имя пользователя или пароль.
          </Form.Text>
        )
        : null}
      <Button variant="outline-primary" type="submit" disabled={formik.isSubmitting}>
        Войти
      </Button>
    </Form>
  );
};

export default LoginPage;

import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: yup.object({
      userName: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(`Submit ${values}`);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="userName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="userName"
          type="name"
          placeholder="Ваш ник"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.userName && formik.errors.userName}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.userName}
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
          isInvalid={formik.touched.userName && formik.errors.userName}
        />
        <Form.Control.Feedback
          type="invalid"
        >
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LoginPage;

import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';

const ErrorBoundaryPage = () => (
  <div className="h-100 d-flex flex-column">
    <Container fluid className="border h-100 my-4 overflow-auto">
      <Row className="h-100 align-items-center justify-content-center">
        <Col className="text-center">
          <span>
            Просим прощения, произошла ошибка, пожалуйста, вернитесь на
            {' '}
          </span>
          <a href="/">
            главную страницу
          </a>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ErrorBoundaryPage;

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="welcome-title">Welcome to Optia Website</h2>
            <p className="welcome-text">
              This platform allows doctors to review AI-generated eye condition
              diagnoses sent by opticians, assess their accuracy, and provide
              final medical evaluations. Doctors can also access the patient’s
              history and offer action-oriented recommendations.
            </p>
            <Button className="welcome-button" href="/about">
              Learn More
            </Button>
          </Col>
          <Col md={6}>
            <img
              src={"Doctorimage.png"}
              alt="Doctor"
              className="welcome-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeSection;

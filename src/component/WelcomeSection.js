import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="welcome-title">Welcome to Eye Care Website</h2>
            <p className="welcome-text">
              We are thrilled to have you on our platform, designed specifically
              for Doctors and Opticians. Here, you can upload images of your
              patients' eyes for advanced analysis. Our system will provide you
              with a detailed report, including potential diagnoses and the
              likelihood of various conditions. Our mission is to empower you
              with the tools you need to deliver exceptional care to your
              patients. Thank you for trusting us with your practice!
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

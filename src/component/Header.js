import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Container, Col, Row } from "react-bootstrap";
const Header = () => {
  return (
    <div className="topbar border-bottom">
      <Container>
        <Row className="align-items-center">
          <Col xs={12}>
            <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 py-2">
              <a
                href="tel:+493046690616"
                className="d-flex align-items-center text-decoration-none site-text-info"
              >
                <FaPhone className="me-2 icon-color" />
                +49 3046690616
              </a>
              <span className="text-muted">|</span>
              <a
                href="mailto:support@augenarzt.cloud"
                className="d-flex align-items-center text-decoration-none site-text-info"
              >
                <FaEnvelope className="me-2 icon-color" />
                support@augenarzt.cloud
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;

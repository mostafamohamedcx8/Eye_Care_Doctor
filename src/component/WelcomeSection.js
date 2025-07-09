import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className="welcome-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="welcome-title">{t("welcomesection.title")}</h2>
            <p className="welcome-text">{t("welcomesection.text")}</p>
            <Button className="welcome-button" href="/about">
              {t("welcomesection.button")}
            </Button>
          </Col>
          <Col md={6}>
            <img
              src={"Doctorimage.jpeg"}
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

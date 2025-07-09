import React from "react";
import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="hero-section">
      <div className="overlay">
        <Container className="text-center text-white hero-content">
          <img src={"logo.png"} alt="Logo" className="hero-logo" />
          <h5 className="hero-subtitle">{t("herosection.subtitle")}</h5>
          <Button href="/Signup" className="hero-button">
            {t("herosection.button")}
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;

import React from "react";
import { Container, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay">
        <Container className="text-center text-white hero-content">
          <img src={"logo.png"} alt="Logo" className="hero-logo" />
          <h5 className="hero-subtitle">
            AI Diagnoses, Doctor-Verified — Smarter Eye Care Decisions
          </h5>
          <Button href="/Signup" className="hero-button">
            SIGN UP
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;

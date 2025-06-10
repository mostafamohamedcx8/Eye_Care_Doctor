import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const AboutSection = () => {
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>
              <span className="separator">/</span>
              <span className="active">About</span>
            </div>
            <h1 className="title">About Us</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="about-content text-center py-5">
        <h2 className="section-title mb-4">Welcome to Optia Website</h2>
        <p className="section-paragraph mx-auto">
          Optia is a smart, AI-powered platform designed to support
          collaboration between opticians and doctors in delivering high-quality
          eye care. Our system enables opticians to upload eye images for
          automated analysis using advanced machine learning models. These
          models generate preliminary diagnostic reports, which are then
          reviewed by specialized doctors via the Optia website. Doctors play a
          crucial role on the platform by evaluating the AI-generated diagnoses,
          confirming or correcting them based on their expertise, and
          determining if any medical action is needed. They also have access to
          patients’ medical histories and detailed AI reports, helping them make
          well-informed decisions. Optia bridges the gap between early optical
          assessments and professional medical validation — making patient care
          faster, smarter, and more reliable.
        </p>
      </Container>
    </>
  );
};
const About = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;

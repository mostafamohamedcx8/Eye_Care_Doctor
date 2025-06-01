import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const ProtectionSection = () => {
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="about-hero">
          <div className="overlay about-hero">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>
              <span className="separator">/</span>
              <span className="active">Protection</span>
            </div>
            <h1 className="title">Protection</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Data Protection</h2>
        <p>
          We prioritize the protection of your medical data and personal
          information. All patient data, images, and reports are stored securely
          with encryption and access control.
        </p>
        <p>
          Our platform is compliant with international health data standards and
          GDPR regulations.
        </p>
      </Container>
    </>
  );
};
const Protection = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <ProtectionSection />
      <Footer />
    </div>
  );
};

export default Protection;

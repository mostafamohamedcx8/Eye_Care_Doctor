import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const PrivacySection = () => {
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
              <span className="active">Privacy</span>
            </div>
            <h1 className="title">Privacy</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Privacy Policy</h2>
        <p>
          We respect your privacy and are committed to protecting your data. We
          collect only the necessary data to provide our services.
        </p>
        <p>
          Your medical images and personal data will never be shared with third
          parties without consent. You can request data deletion at any time by
          contacting support.
        </p>
      </Container>
    </>
  );
};
const Privacy = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <PrivacySection />
      <Footer />
    </div>
  );
};

export default Privacy;

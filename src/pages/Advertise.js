import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const AdvertiseSection = () => {
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
              <span className="active">Advertise</span>
            </div>
            <h1 className="title">Advertise</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Advertise With Us</h2>
        <p>
          Interested in advertising with us? We offer targeted advertising
          opportunities for:
        </p>
        <ul>
          <li>Eye clinics</li>
          <li>Medical equipment providers</li>
          <li>Health tech companies</li>
        </ul>
        <p>📩 Contact us at ahmadsfar@gmail.com</p>
      </Container>
    </>
  );
};
const Advertise = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <AdvertiseSection />
      <Footer />
    </div>
  );
};

export default Advertise;

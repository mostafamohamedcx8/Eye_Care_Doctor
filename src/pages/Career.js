import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const CareerSection = () => {
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
              <span className="active">Career</span>
            </div>
            <h1 className="title">Career</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Career</h2>
        <p>
          We are always looking for passionate professionals to join our mission
          of revolutionizing early eye disease detection.
        </p>
        <p>
          If you are an experienced developer, data scientist, medical
          professional, or optician looking to make a difference with technology
          — we'd love to hear from you.
        </p>
        <h5>Current Openings:</h5>
        <ul>
          <li>Machine Learning Engineer</li>
          <li>Frontend Developer (React.js)</li>
          <li>Clinical Consultant (Ophthalmology)</li>
          <li>Support & Customer Success</li>
        </ul>
        <p>📧 Send your CV to ahmadsfar@gmail.com</p>
      </Container>
    </>
  );
};
const Career = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <CareerSection />
      <Footer />
    </div>
  );
};

export default Career;

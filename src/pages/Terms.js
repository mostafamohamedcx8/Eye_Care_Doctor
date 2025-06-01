import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const TermsSection = () => {
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
              <span className="active">Terms</span>
            </div>
            <h1 className="title">Terms</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Terms & Conditions</h2>
        <ul>
          <li>
            All medical information provided is for diagnostic assistance only
            and does not replace professional medical advice.
          </li>
          <li>
            The AI predictions are for early detection purposes and must be
            reviewed by certified medical personnel.
          </li>
          <li>
            Users are responsible for maintaining the confidentiality of their
            login credentials.
          </li>
          <li>Any misuse of the system will result in account termination.</li>
        </ul>
      </Container>
    </>
  );
};
const Terms = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <TermsSection />
      <Footer />
    </div>
  );
};

export default Terms;

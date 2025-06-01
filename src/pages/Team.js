import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";

const TeamSection = () => {
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
              <span className="active">Team</span>
            </div>
            <h1 className="title">Team</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>Our Team</h2>
        <p>
          Our multidisciplinary team is made up of healthcare professionals, AI
          engineers, and UX designers — all working together to empower
          opticians and doctors through intelligent eye disease detection.
        </p>
        <h5>Core Team Members:</h5>
        <ul>
          <li>Dr. Ahmed Khaled – Ophthalmologist & Medical Advisor</li>
          <li>
            Eng. Mostafa Mohamed – Full Stack Developer & AI Integration Lead
          </li>
          <li>Sara Nabil – Optician Lead</li>
          <li>Youssef Gamal – UI/UX Designer</li>
        </ul>
      </Container>
    </>
  );
};
const Team = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Team;

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
        <div className="hero-section">
          <div className="overlay hero-section">
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
        <h2>Terms and Conditions</h2>
        <p>
          <strong>Effective Date:</strong> 12.06.2025
        </p>
        <p>
          <strong>Last Updated:</strong> 12.06.2025
        </p>

        <p>
          Welcome to <strong>fundus.cloud</strong> ("we", "our", "us"). By
          accessing or using our website{" "}
          <a href="https://fundus.cloud">https://fundus.cloud</a>, you agree to
          be bound by these Terms and Conditions. If you do not agree with any
          part of these terms, you must not use our services.
        </p>

        <h5>1. Scope of Services</h5>
        <ul>
          <li>Opticians upload eye images</li>
          <li>Doctors review and provide feedback</li>
          <li>AI tools generate preliminary suggestions</li>
        </ul>
        <p>All services are currently offered free of charge.</p>

        <h5>2. No Medical Treatment or Paid Services</h5>
        <p>
          We do not provide direct treatment or commercial services. The
          platform supports—but does not replace—medical expertise.
        </p>

        <h5>3. User Eligibility and Responsibilities</h5>
        <ul>
          <li>Only qualified opticians and doctors may use the platform</li>
          <li>Users must upload lawful, accurate, and relevant medical data</li>
          <li>System misuse is strictly prohibited</li>
        </ul>

        <h5>4. Data Protection</h5>
        <p>
          We comply with GDPR and BDSG. Users must ensure patient consent is
          obtained before uploading data. See our{" "}
          <a href="/privacy">Privacy Policy</a> for full details.
        </p>

        <h5>5. Intellectual Property</h5>
        <p>
          All content belongs to <strong>fundus.cloud</strong> unless otherwise
          noted. Users may not copy, alter, or redistribute any part without
          written permission.
        </p>

        <h5>6. Limitation of Liability</h5>
        <ul>
          <li>Accuracy of AI-generated output</li>
          <li>Clinical decisions based on platform use</li>
          <li>System downtime or data loss</li>
        </ul>
        <p>Use is at the user’s own risk.</p>

        <h5>7. Modification of Services</h5>
        <p>
          We reserve the right to update or suspend services at any time.
          Changes will be announced via{" "}
          <a href="https://fundus.cloud">https://fundus.cloud</a>.
        </p>

        <h5>8. Termination of Access</h5>
        <p>
          We may suspend users who violate terms or upload harmful/illegal
          content.
        </p>

        <h5>9. Governing Law and Jurisdiction</h5>
        <p>
          German law applies. Disputes fall under German courts’ jurisdiction.
        </p>

        <h5>10. Contact</h5>
        <p>
          Email: <a href="mailto:ahmadsfar@gmail.com">ahmadsfar@gmail.com</a>
          <br />
          Website: <a href="https://fundus.cloud">fundus.cloud</a>
        </p>
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

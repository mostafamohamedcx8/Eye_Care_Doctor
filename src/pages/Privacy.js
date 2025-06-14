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
        <div className="hero-section">
          <div className="overlay hero-section">
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
          <strong>Effective Date:</strong> 12.06.2025
        </p>
        <p>
          <strong>Last Updated:</strong> 12.06.2025
        </p>

        <p>
          We at <strong>fundus.cloud</strong> ("we", "our", "us") are committed
          to protecting and respecting your privacy in accordance with the
          European Union General Data Protection Regulation (GDPR), the German
          Federal Data Protection Act (BDSG), and all applicable laws and
          professional confidentiality obligations in Germany related to medical
          data.
        </p>

        <p>
          This Privacy Policy explains how we collect, use, store, and share
          your personal data, particularly sensitive health information, when
          you visit our website{" "}
          <a href="https://fundus.cloud">https://fundus.cloud</a>, use our
          services, or otherwise interact with us.
        </p>

        <h5>1. Data Controller</h5>
        <p>
          The data controller for the processing of your personal data is:
          <br />
          <strong>fundus.cloud</strong>
          <br />
          Email: <a href="mailto:ahmadsfar@gmail.com">ahmadsfar@gmail.com</a>
        </p>

        <h5>2. Categories of Data We Process</h5>
        <p>We may process the following categories of personal data:</p>
        <ul>
          <li>
            <strong>General personal data:</strong>
          </li>
          <ul>
            <li>Name</li>
            <li>Address</li>
            <li>Email address</li>
            <li>IP address and cookies</li>
          </ul>
          <li>
            <strong>Health-related and special category data:</strong>
          </li>
          <ul>
            <li>Medical images (e.g., retinal scans, diagnostic images)</li>
            <li>Medical history (if submitted by user or physician)</li>
            <li>Diagnoses</li>
            <li>Uploaded documents or files containing health data</li>
          </ul>
        </ul>
        <p>
          This includes data voluntarily submitted by opticians, doctors, or
          patients, or data we generate through our diagnostic platform.
        </p>

        <h5>3. Legal Basis for Processing</h5>
        <p>In accordance with GDPR (Art. 6 & Art. 9):</p>
        <ul>
          <li>Consent (Art. 6(1)(a))</li>
          <li>Contractual necessity (Art. 6(1)(b))</li>
          <li>Legitimate interests (Art. 6(1)(f))</li>
          <li>Medical diagnosis (Art. 9(2)(h))</li>
        </ul>

        <h5>4. Purpose of Data Processing</h5>
        <ul>
          <li>Provide diagnostic services</li>
          <li>Enable feedback by physicians</li>
          <li>Improve services and maintain security</li>
          <li>Fulfill legal and professional obligations</li>
        </ul>

        <h5>5. Data Recipients and Third-Party Access</h5>
        <p>We do not share your data unless:</p>
        <ul>
          <li>You consent</li>
          <li>Legally required</li>
          <li>Needed for secure data storage under GDPR-compliant terms</li>
        </ul>

        <h5>6. Data Retention</h5>
        <ul>
          <li>Health data stored for up to 10 years</li>
          <li>
            Data deleted upon request (Art. 17 GDPR), unless legally required
          </li>
        </ul>

        <h5>7. Data Security</h5>
        <ul>
          <li>HTTPS encryption</li>
          <li>Access controls</li>
          <li>Secure EU-based hosting</li>
          <li>Regular audits</li>
        </ul>

        <h5>8. Your Rights under GDPR</h5>
        <ul>
          <li>Access</li>
          <li>Rectification</li>
          <li>Erasure</li>
          <li>Restriction</li>
          <li>Portability</li>
          <li>Objection</li>
        </ul>
        <p>
          Right to lodge a complaint:{" "}
          <a
            href="https://www.bfdi.bund.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.bfdi.bund.de
          </a>
        </p>

        <h5>9. Cookies and Tracking</h5>
        <p>
          Essential cookies only; analytics cookies used with consent.
          Preferences manageable via browser or banner.
        </p>

        <h5>10. International Data Transfers</h5>
        <p>
          No data is transferred outside the EEA unless under EU safeguards.
        </p>

        <h5>11. Automated Decision-Making</h5>
        <p>AI suggestions do not replace professional medical judgment.</p>

        <h5>12. Children</h5>
        <p>Not intended for users under 16 without parental consent.</p>

        <h5>13. Changes to This Policy</h5>
        <p>
          We may update this notice. Latest version is available at{" "}
          <a href="https://fundus.cloud">https://fundus.cloud</a>.
        </p>

        <h5>14. Contact</h5>
        <p>
          Email: <a href="mailto:ahmadsfar@gmail.com">ahmadsfar@gmail.com</a>
          <br />
          Website: <a href="https://fundus.cloud">fundus.cloud</a>
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

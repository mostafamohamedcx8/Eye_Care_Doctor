import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("about.breadcrumb.home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">{t("about.breadcrumb.about")}</span>
            </div>
            <h1 className="title">{t("about.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="about-content text-center py-5">
        <h2 className="section-title mb-4">{t("about.sectionTitle")}</h2>
        <p className="section-paragraph mx-auto">
          {t("about.sectionParagraph")}
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

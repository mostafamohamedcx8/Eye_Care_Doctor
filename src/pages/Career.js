import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const CareerSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("career.breadcrumb.home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">{t("career.breadcrumb.career")}</span>
            </div>
            <h1 className="title">{t("career.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>{t("career.heading")}</h2>
        <p>{t("career.intro1")}</p>
        <p>{t("career.intro2")}</p>
        <h5>{t("career.openingsTitle")}</h5>
        <ul>
          <li>{t("career.jobs.mlEngineer")}</li>
          <li>{t("career.jobs.frontend")}</li>
          <li>{t("career.jobs.consultant")}</li>
          <li>{t("career.jobs.support")}</li>
        </ul>
        <p>{t("career.contact")}</p>
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

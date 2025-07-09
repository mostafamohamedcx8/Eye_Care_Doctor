import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const AdvertiseSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("advertise.breadcrumb.home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">
                {t("advertise.breadcrumb.advertise")}
              </span>
            </div>
            <h1 className="title">{t("advertise.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>{t("advertise.heading")}</h2>
        <p>{t("advertise.description")}</p>
        <ul>
          <li>{t("advertise.items.eyeClinics")}</li>
          <li>{t("advertise.items.equipmentProviders")}</li>
          <li>{t("advertise.items.healthTech")}</li>
        </ul>
        <p>{t("advertise.contact")}</p>
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

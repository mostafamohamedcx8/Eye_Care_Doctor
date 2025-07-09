import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const TeamSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("team.breadcrumb_home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">{t("team.breadcrumb_team")}</span>
            </div>
            <h1 className="title">{t("team.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">{t("team.section_title")}</h2>

        <div className="mb-4">
          <h4 className="text-primary">{t("team.supervisory_team")}</h4>
          <ul className="list-unstyled">
            <li>{t("team.supervisor_1")}</li>
            <li>{t("team.supervisor_2")}</li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-primary">{t("team.development_team")}</h4>
          <ul className="list-unstyled">
            <li>{t("team.developer_1")}</li>
            <li>{t("team.developer_2")}</li>
            <li>{t("team.developer_3")}</li>
            <li>{t("team.developer_4")}</li>
            <li>{t("team.developer_5")}</li>
            <li>{t("team.developer_6")}</li>
            <li>{t("team.developer_7")}</li>
            <li>{t("team.developer_8")}</li>
          </ul>
        </div>
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

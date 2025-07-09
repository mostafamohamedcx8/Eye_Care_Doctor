import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const TermsSection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("termssection.breadcrumb_home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">
                {t("termssection.breadcrumb_terms")}
              </span>
            </div>
            <h1 className="title">{t("termssection.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>{t("termssection.policy_title")}</h2>
        <p>{t("termssection.effective_date")}</p>
        <p>{t("termssection.last_updated")}</p>

        <p dangerouslySetInnerHTML={{ __html: t("termssection.intro") }} />

        <h5>{t("termssection.scope_title")}</h5>
        <ul>
          {t("termssection.scope_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
        <p>{t("termssection.scope_note")}</p>

        <h5>{t("termssection.no_treatment_title")}</h5>
        <p>{t("termssection.no_treatment_text")}</p>

        <h5>{t("termssection.user_eligibility_title")}</h5>
        <ul>
          {t("termssection.user_eligibility_items", {
            returnObjects: true,
          }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h5>{t("termssection.data_protection_title")}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: t("termssection.data_protection_text"),
          }}
        />

        <h5>{t("termssection.intellectual_property_title")}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: t("termssection.intellectual_property_text"),
          }}
        />

        <h5>{t("termssection.liability_title")}</h5>
        <ul>
          {t("termssection.liability_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
        <p>{t("termssection.liability_note")}</p>

        <h5>{t("termssection.modification_title")}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: t("termssection.modification_text"),
          }}
        />

        <h5>{t("termssection.termination_title")}</h5>
        <p>{t("termssection.termination_text")}</p>

        <h5>{t("termssection.governing_law_title")}</h5>
        <p>{t("termssection.governing_law_text")}</p>

        <h5>{t("termssection.contact_title")}</h5>
        <p
          dangerouslySetInnerHTML={{ __html: t("termssection.contact_text") }}
        />
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

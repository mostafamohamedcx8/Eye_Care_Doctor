import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const PrivacySection = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("privacysection.breadcrumb_home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">
                {t("privacysection.breadcrumb_privacy")}
              </span>
            </div>
            <h1 className="title">{t("privacysection.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container className="py-5">
        <h2>{t("privacysection.policy_title")}</h2>
        <p>{t("privacysection.effective_date")}</p>
        <p>{t("privacysection.last_updated")}</p>

        <p dangerouslySetInnerHTML={{ __html: t("privacysection.intro_1") }} />
        <p dangerouslySetInnerHTML={{ __html: t("privacysection.intro_2") }} />

        <h5>{t("privacysection.data_controller_title")}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: t("privacysection.data_controller_text"),
          }}
        />

        <h5>{t("privacysection.data_categories_title")}</h5>
        <p>{t("privacysection.data_categories_intro")}</p>
        <ul>
          <li>{t("privacysection.general_data")}</li>
          <ul>
            {t("privacysection.general_data_items", {
              returnObjects: true,
            }).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <li>{t("privacysection.health_data")}</li>
          <ul>
            {t("privacysection.health_data_items", { returnObjects: true }).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </ul>
        <p>{t("privacysection.data_categories_note")}</p>

        <h5>{t("privacysection.legal_basis_title")}</h5>
        <p>{t("privacysection.legal_basis_intro")}</p>
        <ul>
          {t("privacysection.legal_basis_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h5>{t("privacysection.purpose_title")}</h5>
        <ul>
          {t("privacysection.purpose_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h5>{t("privacysection.data_recipients_title")}</h5>
        <p>{t("data_recipients.intro")}</p>
        <ul>
          {t("privacysection.data_recipients_items", {
            returnObjects: true,
          }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h5>{t("privacysection.data_retention_title")}</h5>
        <ul>
          {t("privacysection.data_retention_items", {
            returnObjects: true,
          }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h5>{t("privacysection.data_security_title")}</h5>
        <ul>
          {t("privacysection.data_security_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h5>{t("privacysection.gdpr_rights_title")}</h5>
        <ul>
          {t("privacysection.gdpr_rights_items", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: t("privacysection.gdpr_rights_complaint"),
          }}
        />

        <h5>{t("privacysection.cookies_title")}</h5>
        <p>{t("privacysection.cookies_text")}</p>

        <h5>{t("privacysection.data_transfers_title")}</h5>
        <p>{t("privacysection.data_transfers_text")}</p>

        <h5>{t("privacysection.automated_decision_title")}</h5>
        <p>{t("privacysection.automated_decision_text")}</p>

        <h5>{t("privacysection.children_title")}</h5>
        <p>{t("privacysection.children_text")}</p>

        <h5>{t("privacysection.policy_changes_title")}</h5>
        <pp
          dangerouslySetInnerHTML={{
            __html: t("privacysection.policy_changes_text"),
          }}
        />

        <h5>{t("privacysection.contact_title")}</h5>
        <p
          dangerouslySetInnerHTML={{ __html: t("privacysection.contact_text") }}
        />
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

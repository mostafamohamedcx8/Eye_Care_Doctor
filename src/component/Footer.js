/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>{t("footer.company")}</h5>
            <ul>
              <li>
                <a href="/about">{t("footer.about")}</a>
              </li>
              <li>
                <a href="/career">{t("footer.career")}</a>
              </li>
              <li>
                <a href="/team">{t("footer.team")}</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>{t("footer.more")}</h5>
            <ul>
              <li>
                <a href="/terms">{t("footer.terms")}</a>
              </li>
              <li>
                <a href="/privacy">{t("footer.privacy")}</a>
              </li>
              <li>
                <a href="/advertise">{t("footer.advertise")}</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>{t("footer.social_media")}</h5>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaGooglePlusG />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;

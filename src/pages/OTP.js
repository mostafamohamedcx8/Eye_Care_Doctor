import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyPassword } from "../Redux/actions/Useraction";
import notify from "../Hook/useNotification";
import { Button, Container, Form, Row, Card, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const OTPSection = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [ispress, setispress] = useState(false);
  const { t } = useTranslation();
  const HandelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setispress(true);
    await dispatch(
      verifyPassword({
        resetCode,
      })
    );
    setLoading(false);
    setispress(false);
  };

  const res = useSelector((state) => state.alluser.verfiyPassword);
  console.log(res);
  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.message === "Reset code verified successfully") {
          notify(t("otpCode.notifySuccess"), "success");
          setTimeout(() => {
            Navigate("/NewPassword");
          }, 1000);
        } else if (res.data.message === "Invalid or expired reset code") {
          notify(t("otpCode.notifyError"), "error");
        }
        setLoading(true);
      }
    }
  }, [loading]);

  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("otpCode.breadcrumbHome")}
              </Link>
              <span className="separator">
                {t("otpCode.breadcrumbSeparator")}
              </span>
              <span className="active">
                {t("otpCode.breadcrumbResetPassword")}
              </span>
            </div>
            <h1 className="title">{t("otpCode.title")}</h1>
          </div>
        </div>
      </Row>

      {/* OTP Code Entry Section */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <Card.Body>
            <h4 className="text-center mb-3">{t("otpCode.formHeading")}</h4>
            <p className="text-center text-muted mb-4">
              {t("otpCode.instructionText")}
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  maxLength="6"
                  placeholder={t("otpCode.codePlaceholder")}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  href="/Login"
                  className="w-100 mb-2"
                  variant="secondary"
                >
                  {t("otpCode.cancelButton")}
                </Button>
                <Button
                  className="w-100 mb-2 welcome-button"
                  onClick={HandelSubmit}
                >
                  {t("otpCode.verifyButton")}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        {ispress ? (
          loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <h4> {t("otpCode.done")} </h4>
          )
        ) : null}
      </Container>
    </>
  );
};
const OtpCode = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <OTPSection />
      <Footer />
    </div>
  );
};

export default OtpCode;

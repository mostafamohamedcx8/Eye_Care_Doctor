import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/actions/Useraction";
import notify from "../Hook/useNotification";
import { validateLogin } from "../Validations/validateSignupForm";
import { useTranslation } from "react-i18next";

const LoginSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [ispress, setispress] = useState(false);

  const HandelSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateLogin({ email, password, t });
    if (!isValid) return;
    setLoading(true);
    setispress(true);
    await dispatch(
      LoginUser({
        email,
        password,
        role: "doctor",
      })
    );
    setLoading(false);
    setispress(false);
  };
  const res = useSelector((state) => state.alluser.loginUser);

  useEffect(() => {
    if (loading === false && res) {
      console.log(res.data.message);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        notify(t("loginsection.success_message"), "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else if (res?.data?.message === "Invalid email or password ") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notify(t("loginsection.invalid_credentials_warning"), "warn");
      } else if (
        res?.data?.message ===
        "Your email is not verified. We have sent a new verification link to your email."
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notify(t("loginsection.email_not_verified_warning"), "warn");
      } else if (res?.data?.message === "Invalid email or password or role") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notify(t("loginsection.invalid_role_warning"), "warn");
      } else if (
        res.data.message ===
        "Your medical license is still under review. You will be notified by email once it's verified."
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notify(t("loginsection.license_under_review_warning"), "warn");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setLoading(true);
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
                {t("loginsection.breadcrumb_home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">
                {t("loginsection.breadcrumb_login")}
              </span>
            </div>
            <h1 className="title">{t("loginsection.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container
        className="mt-5 mb-5 p-4 border rounded shadow"
        style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4">{t("loginsection.form_title")}</h2>
        <Form onSubmit={HandelSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>{t("loginsection.email_label")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("loginsection.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>{t("loginsection.password_label")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("loginsection.password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-2 welcome-button">
            {t("loginsection.login_button")}
          </Button>

          <div className="text-center">
            <small>
              {t("loginsection.forgotten_password_text")}{" "}
              <a href="/ResetPassword">
                {t("loginsection.forgotten_password_link")}
              </a>
            </small>
            <br />
            <small>
              {t("loginsection.no_account_text")}{" "}
              <a href="/Signup">{t("loginsection.signup_link")}</a>
            </small>
          </div>
        </Form>
        {ispress ? (
          loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <h4> done </h4>
          )
        ) : null}
      </Container>
    </>
  );
};
const Login = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <LoginSection />
      <Footer />
    </div>
  );
};

export default Login;

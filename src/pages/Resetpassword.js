import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ForgetPassword } from "../Redux/actions/Useraction";
import { validateForgetPassword } from "../Validations/validateSignupForm";
import notify from "../Hook/useNotification";
const ResetSection = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [ispress, setispress] = useState(false);
  const HandelSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForgetPassword({ email });
    if (!isValid) return;
    localStorage.setItem("user-email", email);
    setLoading(true);
    setispress(true);
    await dispatch(
      ForgetPassword({
        email,
      })
    );
    setLoading(false);
    setispress(false);
  };

  const res = useSelector((state) => state.alluser.forgetPassword);
  console.log(res);
  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.message === "Check your email for further instructions") {
          notify("Check your Email for Reset Code", "success");
          setTimeout(() => {
            Navigate("/OtpCode");
          }, 1000);
        } else if (res.data.message === "No user found with this email") {
          notify("No user with this email", "error");
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
                Home
              </Link>
              <span className="separator">/</span>
              <span className="active">Reset Password</span>
            </div>
            <h1 className="title">Reset Your Password</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <Card.Body>
            <h4 className="text-center mb-3">Find Your Account</h4>
            <p className="text-center text-muted mb-4">
              Please Enter Your E-mail To Receive OTP To Reset Your Password.
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  href="/Login"
                  className="w-100 mb-2"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  className="w-100 mb-2 welcome-button"
                  onClick={HandelSubmit}
                >
                  Searchs
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
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
const ResetPassword = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <ResetSection />
      <Footer />
    </div>
  );
};

export default ResetPassword;

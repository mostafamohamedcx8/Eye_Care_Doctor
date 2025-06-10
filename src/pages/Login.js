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

const LoginSection = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [ispress, setispress] = useState(false);

  const HandelSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateLogin({ email, password });
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
    if (loading === false) {
      if (res) {
        console.log(res.data.message);
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          notify("logged in successfully", "success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else if (res?.data?.message === "Invalid email or password ") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify("Invalid E-mail or Password ", "warn");
        } else if (
          res?.data?.message ===
          "Your email is not verified. We have sent a new verification link to your email."
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify(
            "Your E-mail not verified. We sent new verification Link to your E-mail",
            "warn"
          );
        } else if (res?.data?.message === "Invalid email or password or role") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify("Invalid email or password or role", "warn");
        } else if (
          res.data.message ===
          "Your medical license is still under review. You will be notified by email once it's verified."
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          notify(
            "Your medical license is still under review. You will be notified by email once it's verified",
            "warn"
          );
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // notify(,"error")
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
              <span className="active">Login</span>
            </div>
            <h1 className="title">Login</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container
        className="mt-5 mb-5 p-4 border rounded shadow"
        style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={HandelSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-2 welcome-button">
            Log In
          </Button>

          <div className="text-center ">
            <small>
              Forgotten password <a href="/ResetPassword">Click here</a>
            </small>
            <br />
            <small>
              Don't have an account? <a href="/Signup">Sign Up</a>
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

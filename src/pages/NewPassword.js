import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { Button, Container, Form, Row, Card, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Create_New_Password } from "../Redux/actions/Useraction";
import notify from "../Hook/useNotification";
import { validationResetPassword } from "../Validations/validateSignupForm";

const NewPasswordSection = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [newpassword, setnewpassword] = useState("");
  const [confirmnewPassword, setConfirmnewPassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(true);
  const [ispress, setispress] = useState(false);

  const HandelSubmit = async (e) => {
    e.preventDefault();
    const isValid = validationResetPassword({
      newpassword,
      confirmnewPassword,
    });
    if (!isValid) return;
    setLoading(true);
    setispress(true);

    await dispatch(
      Create_New_Password({
        newpassword,
        email: localStorage.getItem("user-email"),
      })
    );
    setLoading(false);
    setispress(false);
  };

  const res = useSelector((state) => state.alluser.createNewPassword);
  console.log(res.data);
  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.message === "Password reset successfully") {
          notify("Password reset successfully", "success");
          setTimeout(() => {
            Navigate("/login");
          }, 1000);
        } else if (res.data.message === "Reset code is not verified") {
          notify("Reset code is not verified", "error");
        } else {
          notify("Request New code", "error");
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

      {/* New Password Form Section */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <Card.Body>
            <h4 className="text-center mb-3">Create a New Password</h4>
            <p className="text-center text-muted mb-4">
              Your new password must be different from the previous password.
            </p>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newpassword}
                  onChange={(e) => setnewpassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmnewPassword}
                  onChange={(e) => setConfirmnewPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                onClick={HandelSubmit}
                variant="primary"
                className="w-100"
              >
                Reset Password
              </Button>
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
const Newpassword = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <NewPasswordSection />
      <Footer />
    </div>
  );
};

export default Newpassword;

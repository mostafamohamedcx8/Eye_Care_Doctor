import { React, useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaGlobe } from "react-icons/fa";

const NavBar = () => {
  const [user, SetUser] = useState("");
  const [token, SetToken] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      SetUser(JSON.parse(storedUser));
      SetToken(token);
    }
  }, []); // يتم التنفيذ مرة واحدة فقط عند تحميل الكومبوننت

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    SetUser("");
    SetToken("");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img src="/logo.png" alt="Eye Care Logo" style={{ height: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {user.firstname ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/ArchivedPatients">Archived Patients</Nav.Link>
                <Nav.Link href="about">About Us</Nav.Link>

                {/* ✅ عرض الروابط فقط إذا لم يكن المستخدم دكتور */}
                {user.role !== "doctor" && (
                  <>
                    <Nav.Link href="/PatientPage">New Patient</Nav.Link>
                  </>
                )}

                <NavDropdown
                  title={
                    <Image
                      src={
                        user?.imageProfile ? user?.imageProfile : "/profile.jpg"
                      }
                      roundedCircle
                      width="40"
                      height="40"
                      style={{ objectFit: "cover" }}
                      alt="User Avatar"
                    />
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item href="/ProfilePage">
                    Your Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="mailto:yasminashraf048@gmail.com">
                    Contact Us
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut} href="/">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Signup">Registration</Nav.Link>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="fundus-tooltip">
                      refer for optician website
                    </Tooltip>
                  }
                >
                  <Nav.Link
                    href="https://auge.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Auge.cloud
                  </Nav.Link>
                </OverlayTrigger>
                <Button
                  variant="button-color"
                  className="ms-3 d-flex align-items-center gap-1 button-color"
                >
                  <FaGlobe /> Language
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

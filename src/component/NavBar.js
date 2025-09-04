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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/actions/Useraction";
const NavBar = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [user, SetUser] = useState("");
  const [token, SetToken] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      SetUser(JSON.parse(storedUser));
      SetToken(token);
    }
  }, []); // يتم التنفيذ مرة واحدة فقط عند تحميل الكومبوننت

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const MYData = useSelector((state) => state.alluser.mydata);
  const userimage = MYData?.data?.imageProfile;
  console.log(MYData);
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    SetUser("");
    SetToken("");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "de" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang); // تحفظ اللغة
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            alt={t("navbar.home")}
            style={{ height: "40px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {user.firstname ? (
              <>
                <Nav.Link href="/">{t("navbar.home")}</Nav.Link>
                <Nav.Link href="/ArchivedPatients">
                  {t("navbar.archived_patients")}
                </Nav.Link>
                <Nav.Link href="about">{t("navbar.about_us")}</Nav.Link>

                {/* ✅ عرض الروابط فقط إذا لم يكن المستخدم دكتور */}
                {user.role !== "doctor" && (
                  <>
                    <Nav.Link href="/PatientPage">
                      {t("navbar.new_patient")}
                    </Nav.Link>
                  </>
                )}

                <NavDropdown
                  title={
                    <Image
                      src={userimage || "/profile.jpg"}
                      roundedCircle
                      width="40"
                      height="40"
                      style={{ objectFit: "cover" }}
                      alt={t("navbar.user_avatar")}
                    />
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item href="/ProfilePage">
                    {t("navbar.your_profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="mailto:support@augenarzt.cloud">
                    {t("navbar.contact_us")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut} href="/">
                    {t("navbar.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/">{t("navbar.home")}</Nav.Link>
                <Nav.Link href="/about">{t("navbar.about_us")}</Nav.Link>
                <Nav.Link href="/Login">{t("navbar.login")}</Nav.Link>
                <Nav.Link href="/Signup">{t("navbar.registration")}</Nav.Link>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="fundus-tooltip">
                      {t("navbar.fundus_tooltip")}
                    </Tooltip>
                  }
                >
                  <Nav.Link
                    href="https://auge.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("navbar.for_opticians")}
                  </Nav.Link>
                </OverlayTrigger>
                <Button
                  variant="button-color"
                  className="ms-3 d-flex align-items-center gap-1 button-color"
                  onClick={toggleLanguage}
                >
                  <FaGlobe /> {t("navbar.language")} (
                  {i18n.language.toUpperCase()})
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

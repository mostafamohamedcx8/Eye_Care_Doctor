import Header from "../component/Header";
import NavBar from "../component/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../Redux/actions/Useraction";
import { validateSignupForm } from "../Validations/validateSignupForm";
import notify from "../Hook/useNotification";
import { useTranslation } from "react-i18next";

const SignupSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imagemedicallicense, setimagemedicallicense] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedcity, setSelectedcity] = useState("");
  useEffect(() => {
    const germanStates = State.getStatesOfCountry("DE"); // DE = Germany
    setStates(germanStates);
  }, []);
  useEffect(() => {
    if (selectedState) {
      const foundCities = City.getCitiesOfState("DE", selectedState);
      setCities(foundCities);
    }
  }, [selectedState]);

  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirthDay, setDateOfBirthDay] = useState("");
  const [dateOfBirthMonth, setDateOfBirthMonth] = useState("");
  const [dateOfBirthYear, setDateOfBirthYear] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [salutation, setsalutation] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [loading, setloading] = useState(true);
  const [ispress, setispress] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+49");
  const User = useSelector((state) => state.alluser.User);
  const fullPhoneNumber = countryCode + phoneNumber;

  const resetFormFields = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setsalutation("");
    setDateOfBirthDay(t("signupsection.day_option"));
    setDateOfBirthMonth(t("signupsection.month_option"));
    setDateOfBirthYear(t("signupsection.year_option"));
    setSelectedState("");
    setSelectedcity("");
    setFullAddress("");
    setloading(true);
    setispress(false);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (e) => {
    e.preventDefault();
    const isValid = validateSignupForm({
      firstname,
      lastname,
      email,
      password,
      passwordConfirm: confirmPassword,
      phoneNumber,
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
      salutation,
      postalCode,
      Specialty: specialty,
      state: selectedState,
      city: selectedcity,
      fullAddress,
      countryCode,
      t,
    });

    if (!isValid) return; // لو فيه خطأ ميفتحش المودال

    setShowModal(true); // لو البيانات صحيحة افتح المودال
  };
  const handelSubmit = async (event) => {
    event.preventDefault();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = monthNames[parseInt(dateOfBirthMonth) - 1];
    const stateObject = states.find((state) => state.isoCode === selectedState);
    const stateName = stateObject ? stateObject.name : selectedState;

    // 1. Create FormData object
    const formData = new FormData();

    // 2. Append normal fields
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", confirmPassword);
    formData.append("phoneNumber", fullPhoneNumber);
    formData.append("Specialty", specialty);
    formData.append("salutation", salutation);
    formData.append("state", stateName);
    formData.append("city", selectedcity);
    formData.append("fullAddress", fullAddress);
    formData.append("role", "doctor");
    formData.append("postalCode", postalCode);
    // Append nested dateOfBirth fields
    formData.append("dateOfBirth.day", Number(dateOfBirthDay));
    formData.append("dateOfBirth.month", monthName);
    formData.append("dateOfBirth.year", Number(dateOfBirthYear));
    formData.append("imagemedicallicense", imagemedicallicense); // أضف الصورة

    const isValid = validateSignupForm({
      firstname,
      lastname,
      email,
      password,
      passwordConfirm: confirmPassword,
      phoneNumber,
      countryCode,
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
      salutation,
      postalCode,
      state: selectedState,
      city: selectedcity,
      Specialty: specialty,
      fullAddress,
      t,
    });

    if (!isValid) return;

    setloading(true);
    setispress(true);

    const res = await dispatch(CreateUser(formData)); // ← خزن النتيجة هنا
    console.log("Response from backend:", res); // send FormData object
    setloading(false);
  };

  useEffect(() => {
    if (loading === false && User) {
      setispress(false);

      if (User?.status === 201) {
        resetFormFields();
        notify(t("signupsection.success_message"), "success");
        navigate("/Login");
      } else if (User?.data?.errors?.[0]?.msg === "Email already exists") {
        console.log(User?.data?.errors?.[0]?.msg);
        notify(t("signupsection.email_exists_warning"), "warn");
      } else {
        notify(
          User?.data?.message || t("signupsection.error_message"),
          "error"
        );
      }

      setTimeout(() => {
        setloading(true);
      }, 1500);
    }
  }, [loading, User]);
  return (
    <>
      {/* Hero Section */}
      <Row>
        <div className="hero-section">
          <div className="overlay hero-section">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t("signupsection.breadcrumb_home")}
              </Link>
              <span className="separator">/</span>
              <span className="active">
                {t("signupsection.breadcrumb_registration")}
              </span>
            </div>
            <h1 className="title">{t("signupsection.title")}</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container
        className="mt-5 mb-5 p-4 border rounded shadow"
        style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
      >
        <h3 className="text-center mb-4">{t("signupsection.form_title")}</h3>

        <Form onSubmit={handleShowModal}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>{t("signupsection.first_name_label")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("signupsection.first_name_placeholder")}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>{t("signupsection.last_name_label")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("signupsection.last_name_placeholder")}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* تاريخ الميلاد */}
          <Form.Label>{t("signupsection.date_of_birth_label")}</Form.Label>
          <Row className="mb-3">
            <Col>
              <Form.Select
                value={dateOfBirthDay}
                onChange={(e) => setDateOfBirthDay(e.target.value)}
              >
                <option>{t("signupsection.day_option")}</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                value={dateOfBirthMonth}
                onChange={(e) => setDateOfBirthMonth(e.target.value)}
              >
                <option value="">{t("signupsection.month_option")}</option>
                {t("signupsection.months", { returnObjects: true }).map(
                  (monthLabel, i) => (
                    <option key={i} value={i + 1}>
                      {monthLabel}
                    </option>
                  )
                )}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                value={dateOfBirthYear}
                onChange={(e) => setDateOfBirthYear(e.target.value)}
              >
                <option>{t("signupsection.year_option")}</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year}>{year}</option>;
                })}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>{t("signupsection.salutation_label")}</Form.Label>
            <Form.Select
              value={salutation}
              onChange={(e) => setsalutation(e.target.value)}
            >
              <option value="" disabled hidden>
                {t("signupsection.salutation_placeholder")}
              </option>
              {t("signupsection.salutations", { returnObjects: true }).map(
                (sal, index) => (
                  <option key={index} value={sal.value}>
                    {sal.label}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("signupsection.email_label")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("signupsection.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("signupsection.password_label")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("signupsection.password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>{t("signupsection.confirm_password_label")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("signupsection.confirm_password_placeholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>{t("signupsection.specialty_label")}</Form.Label>
            <Form.Select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="" disabled>
                {t("signupsection.specialty_placeholder")}
              </option>
              {t("signupsection.specialty_options", {
                returnObjects: true,
              }).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>{t("signupsection.phone_number")}</Form.Label>
            <div className="d-flex">
              {/* ✅ Dropdown لاختيار الدولة */}
              <Form.Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{ maxWidth: "120px", marginRight: "8px" }}
              >
                <option value="+49">🇩🇪 +49</option>
                <option value="+1">🇺🇸 +1</option>
              </Form.Select>

              {/* ✅ Input لرقم الهاتف */}
              <Form.Control
                type="tel"
                placeholder={t("signupsection.phone_number_placeholder")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Form.Text className="text-muted">
              {countryCode === "+49"
                ? "+49XXXXXXXXXX (Germany)"
                : "+1XXXXXXXXXX (USA)"}
            </Form.Text>
          </Form.Group>

          {/* العنوان */}
          <Form.Group className="mb-3">
            <Form.Label>{t("signupsection.state_label")}</Form.Label>
            <Form.Select
              name="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="" disabled>
                {t("signupsection.state_placeholder")}
              </option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("signupsection.city_label")}</Form.Label>
            <Form.Select
              value={selectedcity}
              onChange={(e) => setSelectedcity(e.target.value)}
            >
              <option>{t("signupsection.city_placeholder")}</option>
              {cities.map((city, i) => (
                <option key={i}>{city.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>{t("signupsection.postal_code_label")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("signupsection.postal_code_placeholder")}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>{t("signupsection.full_address_label")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("signupsection.full_address_placeholder")}
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-2 welcome-button">
            {t("signupsection.signup_button")}
          </Button>
        </Form>
        {ispress ? (
          loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <h4> done </h4>
          )
        ) : null}
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("signupsection.modal_title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t("signupsection.modal_label")}</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setimagemedicallicense(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("signupsection.modal_cancel_button")}
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleCloseModal();
              handelSubmit(e);
            }}
            disabled={!imagemedicallicense}
          >
            {t("signupsection.modal_confirm_button")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const Signup = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <SignupSection />
      <Footer />
    </div>
  );
};

export default Signup;

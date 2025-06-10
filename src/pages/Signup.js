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

const SignupSection = () => {
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
  const User = useSelector((state) => state.alluser.User);

  const resetFormFields = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setsalutation("");
    setDateOfBirthDay("Day");
    setDateOfBirthMonth("Month");
    setDateOfBirthYear("Year");
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
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
      salutation,
      postalCode,
      Specialty: specialty,
      state: selectedState,
      city: selectedcity,
      fullAddress,
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
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
      salutation,
      postalCode,
      state: selectedState,
      city: selectedcity,
      Specialty: specialty,
      fullAddress,
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
        notify(
          "Account created. Please check your email for the verification link.",
          "success"
        );
        navigate("/Login");
      } else if (User?.data?.errors?.[0]?.msg === "Email already exists") {
        console.log(User?.data?.errors?.[0]?.msg);
        notify("Email already exists", "warn");
      } else {
        notify(User?.data?.message || "There is a problem", "error");
      }

      setTimeout(() => {
        setloading(true); // يرجع الزر لحالته الطبيعية
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
                Home
              </Link>
              <span className="separator">/</span>
              <span className="active">Registration</span>
            </div>
            <h1 className="title">Sign Up</h1>
          </div>
        </div>
      </Row>

      {/* Content Section */}
      <Container
        className="mt-5 mb-5 p-4 border rounded shadow"
        style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <Form onSubmit={handleShowModal}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* تاريخ الميلاد */}
          <Form.Label>Date of Birth</Form.Label>
          <Row className="mb-3">
            <Col>
              <Form.Select
                value={dateOfBirthDay}
                onChange={(e) => setDateOfBirthDay(e.target.value)}
              >
                <option>Day</option>
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
                <option>Month</option>
                {[
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
                ].map((month, i) => (
                  <option key={i + 1} value={i + 1}>
                    {month}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                value={dateOfBirthYear}
                onChange={(e) => setDateOfBirthYear(e.target.value)}
              >
                <option>Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year}>{year}</option>;
                })}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Salutation</Form.Label>
            <Form.Select
              value={salutation}
              onChange={(e) => setsalutation(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Salutation
              </option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Mx">Mx</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Specialty</Form.Label>
            <Form.Select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="" disabled>
                Select a Specialty
              </option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Hematology">Hematology</option>
              <option value="Neurology">Neurology</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Oncology">Oncology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Radiology">Radiology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Urology">Urology</option>
              <option value="General Surgery">General Surgery</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Family Medicine">Family Medicine</option>
              <option value="Obstetrics and Gynecology">
                Obstetrics and Gynecology
              </option>
            </Form.Select>
          </Form.Group>

          {/* العنوان */}
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={selectedState} // لازم تربطه بالقيمة الحالية
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="" disabled>
                Select German State
              </option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              value={selectedcity}
              onChange={(e) => setSelectedcity(e.target.value)}
            >
              <option>Select City</option>
              {cities.map((city, i) => (
                <option key={i}>{city.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Postal Code (12564)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address (street..)"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-2 welcome-button">
            Sign Up
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
          <Modal.Title>Medical license Or Shop license </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Medical license Or Shop license</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setimagemedicallicense(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleCloseModal();
              handelSubmit(e); // ← نفذ السبميت بعد رفع الصورة
            }}
            disabled={!imagemedicallicense} // اعمل تعطيل للزر لو مفيش صورة
          >
            Confirm & Sign Up
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

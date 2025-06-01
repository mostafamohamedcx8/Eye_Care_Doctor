import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreatePatient } from "../Redux/actions/Patientaction";
import { validatePatientForm } from "../Validations/patientValidation";
import notify from "../Hook/useNotification";
import { useNavigate } from "react-router-dom";

const PatientTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const res = useSelector((state) => state.allpatient.patient);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [salutation, setSalutation] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [loading, setloading] = useState(true);
  const [ispress, setispress] = useState(false);

  const handelSubmit = async (event) => {
    event.preventDefault();

    // validate first
    const isValid = validatePatientForm({
      firstname,
      lastname,
      salutation,
      dateOfBirth,
      ethnicity,
    });
    if (!isValid) return; // لو في خطأ وقف التنفيذ

    const patientData = {
      firstname,
      lastname,
      salutation,
      dateOfBirth,
      ethnicity,
    };

    console.log("Sending patient data:", patientData);
    setloading(true);
    setispress(true);
    await dispatch(CreatePatient(patientData));
    setloading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res.status === 201) {
        const id = res?.data?.data?._id;
        notify("Patient created successfully.", "success");
        navigate(`/Examination/${id}`);
      }
      setFirstname("");
      setLastname("");
      setSalutation("");
      setDob("");
      setEthnicity("");
      setloading(true);
      setispress(false);
      setTimeout(() => {
        setispress(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold button-color">
        Create New Patient
      </h2>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="Enter First Name"
              required
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Enter Last Name"
              required
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Salutation</Form.Label>
            <Form.Select
              required
              onChange={(e) => setSalutation(e.target.value)}
              value={salutation}
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
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>

            <Form.Control
              type="date"
              required
              onChange={(e) => setDob(e.target.value)}
              value={dateOfBirth}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Ethnicity</Form.Label>

            <Form.Select
              required
              onChange={(e) => setEthnicity(e.target.value)}
              value={ethnicity}
            >
              <option value="" disabled hidden>
                Select ethnicity
              </option>
              <optgroup label="Asian or Asian British">
                <option value="Indian">Indian</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Chinese">Chinese</option>
                <option value="Any other Asian background">
                  Any other Asian background
                </option>
              </optgroup>
              <optgroup label="Black, Black British, Caribbean or African">
                <option value="Caribbean">Caribbean</option>
                <option value="African">African</option>
                <option value="Any other Black, Black British, or Caribbean background">
                  Any other Black, Black British, or Caribbean background
                </option>
              </optgroup>
              <optgroup label="Mixed or multiple ethnic groups">
                <option value="White and Black Caribbean">
                  White and Black Caribbean
                </option>
                <option value="White and Black African">
                  White and Black African
                </option>
                <option value="White and Asian">White and Asian</option>
                <option value="Any other Mixed or multiple ethnic background">
                  Any other Mixed or multiple ethnic background
                </option>
              </optgroup>
              <optgroup label="White">
                <option value="English, Welsh, Scottish, Northern Irish or British">
                  English, Welsh, Scottish, Northern Irish or British
                </option>
                <option value="Irish">Irish</option>
                <option value="Gypsy or Irish Traveller">
                  Gypsy or Irish Traveller
                </option>
                <option value="Roma">Roma</option>
                <option value="Any other White background">
                  Any other White background
                </option>
              </optgroup>
              <optgroup label="Other ethnic group">
                <option value="Arab">Arab</option>
                <option value="Any other ethnic group">
                  Any other ethnic group
                </option>
              </optgroup>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={handelSubmit}>
            Create Patient
          </Button>
        </Col>
      </Row>

      {ispress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4> done </h4>
        )
      ) : null}
    </Container>
  );
};

export default PatientTab;

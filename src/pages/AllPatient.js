import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import Paginationcomponent from "../component/pagination";
import { useNavigate } from "react-router-dom";
import {
  getMypatient,
  getAllMyPatientPage,
  deleteMyPatient,
} from "./../Redux/actions/Patientaction";
import notify from "../Hook/useNotification";

const PatientTableUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const userFromStorage = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => {
    setShow(false);
    setDeleteId(null);
  };
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getMypatient(10, keyword));
  }, [keyword]);

  const MypatinetData = useSelector((state) => state.allpatient.mypatient);
  const Loading = useSelector((state) => state.allpatient.loading);

  let pagecount = 0;
  if (MypatinetData?.paginationresults?.numberOfPages) {
    pagecount = MypatinetData?.paginationresults?.numberOfPages;
  }

  const getpage = (page) => {
    dispatch(getAllMyPatientPage(page));
  };

  const AllPatient = MypatinetData?.data || [];

  const handleView = (id) => {
    setTimeout(() => {
      navigate(`/ReportsList/${id}`);
    }, 1000);
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    await dispatch(deleteMyPatient(deleteId));
    setLoading(false);
    handleClose();
  };

  const res = useSelector((state) => state.allpatient.deletpatient);
  useEffect(() => {
    if (loading === false) {
      if (res === "") {
        notify("Patient deleted successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("There was a problem with the deletion", "error");
      }
    }
  }, [loading]);

  return (
    <>
      <Header />
      <NavBar />
      <Container className="mt-5">
        <h2 className="text-center mb-4 fw-bold button-color">Patients List</h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Search by name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Salutation</th>
              <th>Ethnicity</th>
              <th>Reports Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : AllPatient.length > 0 ? (
              AllPatient.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {patient.firstname} {patient.lastname}
                  </td>
                  <td>
                    {new Date(patient.dateOfBirth).toLocaleDateString("de-DE")}
                  </td>
                  <td>{patient.salutation}</td>
                  <td>{patient.ethnicity}</td>
                  <td>{patient.report?.length || 0}</td>
                  <td>
                    {userFromStorage?.role !== "doctor" && (
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleShow(patient._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleView(patient._id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    {userFromStorage?.role !== "doctor" && (
                      <button
                        className="btn btn-sm btn-outline-success me-2 "
                        onClick={() => navigate(`/Examination/${patient._id}`)}
                      >
                        <i className="bi bi-journal-plus"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {pagecount > 1 && (
          <Paginationcomponent pagecount={pagecount} onpress={getpage} />
        )}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this patient?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PatientTableUI;

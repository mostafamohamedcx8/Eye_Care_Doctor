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
  deleteMyPatient,
  getMyArchivedpatient,
  getAllMyArchivedPatientPage,
  toggleArchivePatient,
  getREPORTSTATS,
} from "../Redux/actions/Patientaction";
import notify from "../Hook/useNotification";

const PatientTableUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
    setDeleteId(null);
  };
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getMyArchivedpatient(10, keyword));
  }, [keyword]);

  const MypatinetData = useSelector(
    (state) => state.allpatient.archivedpatient
  );
  const Loading = useSelector((state) => state.allpatient.loading);

  useEffect(() => {
    dispatch(getREPORTSTATS());
  }, []);

  const Reportstats = useSelector((state) => state.allpatient.reportstats);
  console.log(Reportstats?.data);
  let pagecount = 0;
  if (MypatinetData?.paginationresults?.numberOfPages) {
    pagecount = MypatinetData?.paginationresults?.numberOfPages;
  }

  const getpage = (page) => {
    dispatch(getAllMyArchivedPatientPage(page));
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

  const handleToggleArchive = async (patientId) => {
    try {
      // تعيين loading للمريض المحدد
      setArchiveLoading((prev) => ({ ...prev, [patientId]: true }));

      // استدعاء الـ action
      await dispatch(toggleArchivePatient(patientId));

      // إعادة تحميل البيانات بعد نجاح العملية
      setRefreshData((prev) => !prev);

      // إظهار رسالة نجاح (اختياري)
      // يمكنك استخدام toast أو alert
      notify("Patient archive status updated successfully!", "success");
    } catch (error) {
      notify("Faild updating patient archive status", "error");
    } finally {
      // إلغاء loading
      setArchiveLoading((prev) => ({ ...prev, [patientId]: false }));
    }
  };

  // useEffect لإعادة تحميل البيانات عند تغيير refreshData
  useEffect(() => {
    if (refreshData !== false) {
      // استدعاء دالة جلب البيانات مرة أخرى
      // مثال: dispatch(getAllPatients());
      dispatch(getMyArchivedpatient(10, keyword));
    }
  }, [refreshData, keyword]);

  return (
    <>
      <Header />
      <NavBar />
      <Container className="mt-5">
        <h2 className="text-center mb-4 fw-bold button-color">
          Archived Patients
        </h2>

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
              <th>AI Report Count</th>
              <th
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Seen & Feedback"
              >
                Report Status
              </th>
              <th>Tools</th>
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
                  <td>
                    {(() => {
                      const lastReport =
                        patient.report?.[patient.report.length - 1];
                      const modelResults = lastReport?.modelResults;
                      let riskColor = "";

                      if (modelResults?.leftEye || modelResults?.rightEye) {
                        const left = modelResults.leftEye
                          ? JSON.parse(modelResults.leftEye)
                          : null;
                        const right = modelResults.rightEye
                          ? JSON.parse(modelResults.rightEye)
                          : null;

                        const confidences = [];

                        const extractConfidences = (eyeData) => {
                          if (!eyeData) return;
                          for (const key in eyeData) {
                            const conf = eyeData[key]?.confidence;
                            if (conf !== null && typeof conf === "number") {
                              confidences.push(conf);
                            }
                          }
                        };

                        extractConfidences(left);
                        extractConfidences(right);

                        const maxConfidence = Math.max(...confidences, 0);

                        if (maxConfidence > 80) {
                          riskColor = "bg-danger text-white";
                        } else if (maxConfidence >= 60) {
                          riskColor = "bg-warning text-dark";
                        } else {
                          riskColor = "bg-success text-white";
                        }
                      }

                      return (
                        <span className={`px-2 py-1 rounded ${riskColor}`}>
                          {index + 1}
                        </span>
                      );
                    })()}
                  </td>
                  <td>
                    {patient.salutation}.{patient.firstname} {patient.lastname}
                  </td>
                  <td>
                    {new Date(patient.dateOfBirth).toLocaleDateString("de-DE")}
                  </td>
                  <td>{patient.report?.length || 0}</td>
                  <td>
                    {(() => {
                      const stats = Reportstats?.data?.find(
                        (stat) => stat.patientId === patient._id
                      );

                      if (!stats)
                        return (
                          <span className="text-muted">لا يوجد بيانات</span>
                        );

                      return (
                        <>
                          <span className="text-success me-2">
                            <i className="bi bi-eye-fill me-1"></i>
                            {stats.reportsWithFeedback}
                          </span>
                          <span className="text-secondary">
                            <i className="bi bi-eye-slash-fill me-1"></i>
                            {stats.reportsWithoutFeedback}
                          </span>
                        </>
                      );
                    })()}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleView(patient._id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="Remove from Archive"
                      onClick={(e) => handleToggleArchive(patient._id, e)}
                      disabled={archiveLoading[patient._id]}
                    >
                      <i className="bi bi-archive"></i>
                      <i className="bi bi-arrow-up-short ms-1"></i>
                    </button>
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

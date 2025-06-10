import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientWithReport,
  deleteMyReport,
} from "./../Redux/actions/Reportaction";
import { useParams, useNavigate } from "react-router-dom";
import notify from "../Hook/useNotification";

const ReportsList = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPatientWithReport(id));
  }, []);

  useEffect(() => {
    if (loading === false) {
      if (res === "") {
        notify("Report deleted successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("There was a problem with the deletion", "error");
      }
    }
  }, [loading]);

  const handleClose = () => {
    setShow(false);
    setDeleteId(null);
  };
  const handleShow = (reportid) => {
    setDeleteId(reportid);
    setShow(true);
  };

  const ReportData = useSelector(
    (state) => state.allreport.getpatientwithreport
  );
  const res = useSelector((state) => state.allreport.deletemyreport);

  if (!ReportData?.data) {
    return <p>Loading patient report...</p>; // أو تعمل Spinner أحسن
  }
  const Report = ReportData?.data || [];
  console.log(Report?.reports);

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    await dispatch(deleteMyReport(deleteId));
    setLoading(false);
    handleClose();
  };

  const handleViewDetails = (reportId) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/ExaminationReport/${reportId}`);
      setIsNavigating(false);
    }, 1000);
  };
  if (!ReportData?.data) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading patient report...</p>
      </div>
    );
  }
  // بيانات وهمية للتجريب
  return (
    <>
      <Header />
      <NavBar />
      <Container className="my-4">
        <h2 className="text-center mb-4 fw-bold button-color">
          Patient Reports
        </h2>
        <Row>
          {Report?.reports?.length === 0 ? (
            <Col>
              <p className="text-center text-danger fw-bold">
                No reports available
              </p>
            </Col>
          ) : (
            Report?.reports?.map((report) => {
              const rightEyePredictions = report?.modelResults?.rightEye
                ? JSON.parse(report.modelResults.rightEye)
                : null;
              const leftEyePredictions = report?.modelResults?.leftEye
                ? JSON.parse(report.modelResults.leftEye)
                : null;

              const predictionsToShow =
                rightEyePredictions || leftEyePredictions;
              const predictionLabel = rightEyePredictions
                ? "Right Eye"
                : leftEyePredictions
                ? "Left Eye"
                : null;

              return (
                <Col md={4} key={report._id} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0">
                          Report Date:{" "}
                          {new Date(report?.createdAt).toLocaleDateString()}
                        </Card.Title>
                        {userFromStorage?.role !== "doctor" && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleShow(report?._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>

                      <Card.Subtitle className="mb-2 text-muted">
                        RightEye visusCC:{" "}
                        {report?.eyeExamination?.rightEye?.visusCC}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        LeftEye visusCC:{" "}
                        {report?.eyeExamination?.leftEye?.visusCC}
                      </Card.Subtitle>

                      {predictionsToShow ? (
                        <>
                          <Card.Text className="fw-bold mb-1">
                            Model Prediction - {predictionLabel}
                          </Card.Text>

                          {/* جودة الصورة */}
                          {predictionsToShow.image_quality && (
                            <Card.Text className="text-warning">
                              <strong>Image Quality:</strong>{" "}
                              {predictionsToShow.image_quality.status} (
                              {predictionsToShow.image_quality.confidence ??
                                "N/A"}
                              %)
                            </Card.Text>
                          )}

                          {/* الأمراض المكتشفة */}
                          {Object.entries(predictionsToShow)
                            .filter(
                              ([key, value]) =>
                                key !== "image_quality" &&
                                key !== "eye_side" &&
                                value.status === "Detected"
                            )
                            .map(([diseaseName, details]) => (
                              <Card.Text key={diseaseName}>
                                <strong>{diseaseName}</strong> detected at{" "}
                                <strong>{details.confidence ?? "N/A"}%</strong>
                              </Card.Text>
                            ))}

                          {/* لو مفيش أمراض مكتشفة */}
                          {Object.entries(predictionsToShow).filter(
                            ([key, value]) =>
                              key !== "image_quality" &&
                              key !== "eye_side" &&
                              value.status === "Detected"
                          ).length === 0 && (
                            <Card.Text>No detected diseases.</Card.Text>
                          )}
                        </>
                      ) : (
                        <Card.Text>No model prediction available</Card.Text>
                      )}

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewDetails(report._id)}
                        disabled={isNavigating}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>

        {isNavigating ? <Spinner animation="border" variant="primary" /> : null}
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
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

export default ReportsList;

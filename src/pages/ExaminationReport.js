import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificReport } from "./../Redux/actions/Reportaction";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { CreateFeedBack } from "./../Redux/actions/Useraction";
import notify from "../Hook/useNotification";

const PatientReport = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const DoctorId = userFromStorage._id;
  const [showDoctorFeedback, setShowDoctorFeedback] = useState(false);
  const [loading, setloading] = useState(true);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [rightEyeFeedback, setRightEyeFeedback] = useState({
    aiPredictionCorrect: "",
    comment: "",
  });

  const [leftEyeFeedback, setLeftEyeFeedback] = useState({
    aiPredictionCorrect: "",
    comment: "",
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [recommendedAction, setRecommendedAction] = useState("");
  useEffect(() => {
    dispatch(getSpecificReport(id));
  }, []);

  // Filter feedback by the logged-in doctor's ID
  const ReportData = useSelector((state) => state.allreport.specificreport);
  const Report = ReportData.data || [];
  console.log(Report);

  useEffect(() => {
    if (Report?.doctorFeedbacks) {
      const doctorFeedback = Report.doctorFeedbacks.find(
        (feedback) => feedback.doctor._id === DoctorId
      );
      if (doctorFeedback) {
        setRightEyeFeedback({
          aiPredictionCorrect:
            doctorFeedback.rightEyeFeedback.aiPredictionCorrect || "",
          comment: doctorFeedback.rightEyeFeedback.comment || "",
        });
        setLeftEyeFeedback({
          aiPredictionCorrect:
            doctorFeedback.leftEyeFeedback.aiPredictionCorrect || "",
          comment: doctorFeedback.leftEyeFeedback.comment || "",
        });
        setDiagnosis(doctorFeedback.diagnosis || "");
        setRecommendedAction(doctorFeedback.recommendedAction || "");
      }
    }
  }, [Report, DoctorId]);

  const reportRef = useRef();

  const handleDownloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("eye-examination-report.pdf");
    });
  };

  const displayValue = (value) => {
    return value !== undefined && value !== null && value !== "" ? (
      value
    ) : (
      <span style={{ color: "red" }}>X</span>
    );
  };

  const displayDate = (date) => {
    return date ? (
      new Date(date).toLocaleDateString("de-DE")
    ) : (
      <span style={{ color: "red" }}>X</span>
    );
  };

  // دالة لعرض نعم/لا أو X حمراء لو مش موجود
  const displayBoolean = (value) => {
    return value !== undefined ? (
      value ? (
        "Yes"
      ) : (
        "No"
      )
    ) : (
      <span style={{ color: "red" }}>X</span>
    );
  };

  const handleSendFeedBack = async (event) => {
    event.preventDefault();
    setloading(true);
    await dispatch(
      CreateFeedBack(
        {
          rightEyeFeedback,
          leftEyeFeedback,
          diagnosis,
          recommendedAction,
        },
        id
      )
    );
    setloading(false);
    setFeedbackSent(true); // <-- Flag علشان نفعل الإشعار مرة واحدة
  };
  const res = useSelector((state) => state.alluser.feedback);

  useEffect(() => {
    if (feedbackSent) {
      if (res && res?.data?.message === "Feedback added successfully") {
        notify("Feedback added successfully", "success");
      } else {
        notify("Feedback add failed", "warn");
      }

      setFeedbackSent(false); // نرجعه تاني false علشان ميتكررش
    }
  }, [feedbackSent, res]);

  return (
    <>
      <Header />
      <NavBar />
      <Container
        ref={reportRef}
        className="mt-5 mb-5 p-4 border rounded shadow bg-light"
      >
        <h2 className="mb-4 text-center">Patient Eye Examination Report</h2>

        {/* Patient Info */}
        <Card className="mb-4 shadow rounded-2">
          <Card.Header className="custom-card-header">
            Patient Information
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Right Column */}
              <Col md={6}>
                <div className="mb-2">
                  <strong>Name:</strong> {Report?.patient?.firstname}{" "}
                  {Report?.patient?.lastname}
                </div>
                <div className="mb-2">
                  <strong>Salutation:</strong> {Report?.patient?.salutation}
                </div>
                <div className="mb-2">
                  <strong>Ethnicity:</strong> {Report?.patient?.ethnicity}
                </div>
              </Col>
              {/* Left Column */}
              <Col md={6}>
                <div className="mb-2">
                  <strong>ID:</strong> {Report?.patient?._id}
                </div>
                <div className="mb-2">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(Report?.patient?.dateOfBirth).toLocaleDateString(
                    "de-DE"
                  )}
                </div>
                <div className="mb-2">
                  <strong>Date Of Examination:</strong>{" "}
                  {new Date(Report?.createdAt).toLocaleDateString("de-DE")}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Medical History */}
        <Card className="mb-4">
          <Card.Header className="custom-card-header">
            Medical History
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {Report?.history?.medical?.map((disease, idx) => (
                <ListGroup.Item key={idx}>
                  <div className="d-flex justify-content-between">
                    <strong>{disease.name}</strong>
                    <div className="ms-3">
                      <span>
                        <strong>Has Condition:</strong>{" "}
                        {disease.hasCondition ? "Yes" : "No"}
                      </span>
                      <span className="ms-3">
                        <strong>Applies To:</strong> {disease.appliesTo}
                      </span>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Eye Diseases */}
        <Card className="mb-4">
          <Card.Header className="custom-card-header">Eye History</Card.Header>
          <Card.Body>
            <ListGroup>
              {Report?.history?.eye?.map((disease, idx) => (
                <ListGroup.Item key={idx}>
                  <div className="d-flex justify-content-between">
                    <strong>{disease.name}</strong>
                    <div className="ms-3">
                      <span>
                        <strong>Has Condition:</strong>{" "}
                        {disease.hasCondition ? "Yes" : "No"}
                      </span>
                      <span className="ms-3">
                        <strong>Applies To:</strong> {disease.appliesTo}
                      </span>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header className="custom-card-header">
            Right Eye Examination
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <strong>Visus (CC):</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.visusCC)}
              </Col>
              <Col>
                <strong>Previous Value:</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.previousValue)}
              </Col>
              <Col>
                <strong>Since:</strong>{" "}
                {displayDate(Report?.eyeExamination?.rightEye?.since)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Sphere:</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.sphere)}
              </Col>
              <Col>
                <strong>Cylinder:</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.cylinder)}
              </Col>
              <Col>
                <strong>Axis:</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.axis)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Intraocular Pressure:</strong>{" "}
                {displayValue(
                  Report?.eyeExamination?.rightEye?.intraocularPressure
                )}
              </Col>
              <Col>
                <strong>Corneal Thickness:</strong>{" "}
                {displayValue(
                  Report?.eyeExamination?.rightEye?.cornealThickness
                )}
              </Col>
              <Col>
                <strong>Chamber Angle:</strong>{" "}
                {displayValue(Report?.eyeExamination?.rightEye?.chamberAngle)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Amsler Test Abnormal:</strong>{" "}
                {displayBoolean(
                  Report?.eyeExamination?.rightEye?.amslerTestAbnormal
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Left Eye Exam */}
        <Card className="mb-4">
          <Card.Header className="custom-card-header">
            Left Eye Examination
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <strong>Visus (CC):</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.visusCC)}
              </Col>
              <Col>
                <strong>Previous Value:</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.previousValue)}
              </Col>
              <Col>
                <strong>Since:</strong>{" "}
                {displayDate(Report?.eyeExamination?.leftEye?.since)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Sphere:</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.sphere)}
              </Col>
              <Col>
                <strong>Cylinder:</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.cylinder)}
              </Col>
              <Col>
                <strong>Axis:</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.axis)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Intraocular Pressure:</strong>{" "}
                {displayValue(
                  Report?.eyeExamination?.leftEye?.intraocularPressure
                )}
              </Col>
              <Col>
                <strong>Corneal Thickness:</strong>{" "}
                {displayValue(
                  Report?.eyeExamination?.leftEye?.cornealThickness
                )}
              </Col>
              <Col>
                <strong>Chamber Angle:</strong>{" "}
                {displayValue(Report?.eyeExamination?.leftEye?.chamberAngle)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <strong>Amsler Test Abnormal:</strong>{" "}
                {displayBoolean(
                  Report?.eyeExamination?.leftEye?.amslerTestAbnormal
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Eye Images */}
        <Card className="mb-4">
          <Card.Header className="custom-card-header">
            Uploaded Eye Images
          </Card.Header>
          <Card.Body>
            {/* Right Eye Section */}
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Right Eye</h5>
              {Report?.eyeExamination?.rightEye?.imageCaptureDate && (
                <span className="text-muted">
                  Image Capture Date:{" "}
                  {new Date(
                    Report.eyeExamination.rightEye.imageCaptureDate
                  ).toLocaleDateString("de-DE")}
                </span>
              )}
            </div>
            {Report?.eyeExamination?.rightEye?.images?.length > 0 ? (
              <ul>
                <div className="d-flex flex-wrap gap-3 mt-2">
                  {Report.eyeExamination.rightEye.images.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thumbnail-link"
                    >
                      <img
                        src={link}
                        alt={`Right Eye Image ${idx + 1}`}
                        className="eye-thumbnail"
                      />
                    </a>
                  ))}
                </div>
              </ul>
            ) : (
              <p>No images available</p>
            )}

            {/* Left Eye Section */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5 className="mb-0">Left Eye</h5>
              {Report?.eyeExamination?.leftEye?.imageCaptureDate && (
                <span className="text-muted">
                  Image Capture Date:{" "}
                  {new Date(
                    Report.eyeExamination.leftEye.imageCaptureDate
                  ).toLocaleDateString("de-DE")}
                </span>
              )}
            </div>
            {Report?.eyeExamination?.leftEye?.images?.length > 0 ? (
              <ul>
                <div className="d-flex flex-wrap gap-3 mt-2">
                  {Report.eyeExamination.leftEye.images.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="thumbnail-link"
                    >
                      <img
                        src={link}
                        alt={`Left Eye Image ${idx + 1}`}
                        className="eye-thumbnail"
                      />
                    </a>
                  ))}
                </div>
              </ul>
            ) : (
              <p>No images available</p>
            )}
          </Card.Body>
        </Card>
        {/* Prediction */}
        {/* <Card className="mb-4 border-success">
          <Card.Header className="bg-success text-white">
            Model Prediction
          </Card.Header>
          <Card.Body>
            <h5>Final Prediction:</h5>
            <ul>
              <li>
                <strong>{Report?.modelResults?.disease1?.name}:</strong>{" "}
                {Report?.modelResults?.disease1?.percentage}%
              </li>
              <li>
                <strong>{Report?.modelResults?.disease2?.name}:</strong>{" "}
                {Report?.modelResults?.disease2?.percentage}%
              </li>
              <li>
                <strong>{Report?.modelResults?.disease3?.name}:</strong>{" "}
                {Report?.modelResults?.disease3?.percentage}%
              </li>
            </ul>
          </Card.Body>
        </Card> */}

        <Card className="mb-4 border-primary">
          <Card.Header className="bg-primary text-white">
            Model Prediction - Right Eye
          </Card.Header>
          <Card.Body>
            {Report?.modelResults?.rightEye ? (
              (() => {
                const rightData = JSON.parse(Report.modelResults.rightEye);
                const isImageQualityBad =
                  rightData.image_quality?.status !== "Adequate";

                const filteredDiseases = Object.entries(rightData).filter(
                  ([key, value]) =>
                    key !== "image_quality" &&
                    key !== "eye_side" &&
                    value.status === "Detected"
                );

                return (
                  <>
                    {filteredDiseases.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Disease</th>
                            <th>Confidence (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDiseases.map(([key, value]) => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {value.confidence ?? "N/A"}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No detected diseases in the right eye.</p>
                    )}

                    {isImageQualityBad && (
                      <div className="alert alert-warning mt-3">
                        <strong>Bad image quality: - can be due to :</strong>
                        <br />
                        Media Opacity due to: Corneal opacity, Cataract,
                        vitreous opacities, vitreous hemorrhage/ inflammation,
                        tear film issues, etc. OR Optics misalignment (or
                        insufficient pupillary dilation, focus)
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              <p>No prediction data available for the right eye.</p>
            )}
          </Card.Body>

          <Card.Header className="bg-primary text-white">
            Model Prediction - Left Eye
          </Card.Header>
          <Card.Body>
            {Report?.modelResults?.leftEye ? (
              (() => {
                const leftData = JSON.parse(Report.modelResults.leftEye);
                const isImageQualityBad =
                  leftData.image_quality?.status !== "Adequate";

                const filteredDiseases = Object.entries(leftData).filter(
                  ([key, value]) =>
                    key !== "image_quality" &&
                    key !== "eye_side" &&
                    value.status === "Detected"
                );

                return (
                  <>
                    {filteredDiseases.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Disease</th>
                            <th>Confidence (%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDiseases.map(([key, value]) => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {value.confidence ?? "N/A"}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No detected diseases in the left eye.</p>
                    )}

                    {isImageQualityBad && (
                      <div className="alert alert-warning mt-3">
                        <strong>Bad image quality: - can be due to :</strong>
                        <br />
                        Media Opacity due to: Corneal opacity, Cataract,
                        vitreous opacities, vitreous hemorrhage/ inflammation,
                        tear film issues, etc. OR Optics misalignment (or
                        insufficient pupillary dilation, focus)
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              <p>No prediction data available for the left eye.</p>
            )}
          </Card.Body>
        </Card>

        <Card className="mb-4 border-success">
          <Card.Header
            onClick={() => setShowDoctorFeedback(!showDoctorFeedback)}
            className="bg-success text-white d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <span>Doctor's Feedback Form</span>
            {showDoctorFeedback ? <ChevronUp /> : <ChevronDown />}
          </Card.Header>

          {showDoctorFeedback && (
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Right Eye - AI Prediction Correct?</strong>
                  </Form.Label>
                  <Form.Select
                    value={rightEyeFeedback.aiPredictionCorrect}
                    onChange={(e) =>
                      setRightEyeFeedback({
                        ...rightEyeFeedback,
                        aiPredictionCorrect: e.target.value,
                      })
                    }
                  >
                    <option value="">Select...</option>
                    <option value="correct">Correct</option>
                    <option value="incorrect">Incorrect</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Right Eye Comment</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={rightEyeFeedback.comment}
                    onChange={(e) =>
                      setRightEyeFeedback({
                        ...rightEyeFeedback,
                        comment: e.target.value,
                      })
                    }
                    placeholder="Enter your opinion about the right eye prediction"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Left Eye - AI Prediction Correct?</strong>
                  </Form.Label>
                  <Form.Select
                    value={leftEyeFeedback.aiPredictionCorrect}
                    onChange={(e) =>
                      setLeftEyeFeedback({
                        ...leftEyeFeedback,
                        aiPredictionCorrect: e.target.value,
                      })
                    }
                  >
                    <option value="">Select...</option>
                    <option value="correct">Correct</option>
                    <option value="incorrect">Incorrect</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Left Eye Comment</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={leftEyeFeedback.comment}
                    onChange={(e) =>
                      setLeftEyeFeedback({
                        ...leftEyeFeedback,
                        comment: e.target.value,
                      })
                    }
                    placeholder="Enter your opinion about the left eye prediction"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Diagnosis</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter your medical diagnosis"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Recommended Action</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={recommendedAction}
                    onChange={(e) => setRecommendedAction(e.target.value)}
                    placeholder="Suggested next steps for the patient"
                  />
                </Form.Group>
                <Button
                  variant="success"
                  onClick={(e) => handleSendFeedBack(e)}
                >
                  Submit Feedback
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>

        <div className="d-flex justify-content-center mt-4 gap-3">
          <Button onClick={handleDownloadPDF} variant="danger">
            Download Report
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default PatientReport;

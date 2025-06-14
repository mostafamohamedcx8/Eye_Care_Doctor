import React, { useRef, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Select from "react-select";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificReport } from "./../Redux/actions/Reportaction";
import { useNavigate } from "react-router-dom";
import { CreateFeedBack } from "./../Redux/actions/Useraction";
import notify from "../Hook/useNotification";
import html2pdf from "html2pdf.js";

const PatientReport = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const [showRightEyeFeedback, setShowRightEyeFeedback] = useState(false);
  const DoctorId = userFromStorage._id;
  const [loading, setloading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showLeftEyeFeedback, setShowLeftEyeFeedback] = useState(false);
  const [rightEyeFeedback, setRightEyeFeedback] = useState({
    aiPredictionCorrect: "",
    comment: "",
    diagnosis: "",
    recommendedAction: "",
  });

  const [leftEyeFeedback, setLeftEyeFeedback] = useState({
    aiPredictionCorrect: "",
    comment: "",
    diagnosis: "",
    recommendedAction: "",
  });

  useEffect(() => {
    dispatch(getSpecificReport(id));
  }, []);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      const response = await fetch("/ICD10_Final_Subcodes.xlsx"); // الملف موجود في public
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const options = data.map((item) => ({
        label: `${item["definition"]} (${item["sub-code"]})`, // تعديل بناءً على الأعمدة الموجودة في الشيت
        value: item["definition"],
      }));

      setDiagnosisOptions(options);
    };

    fetchDiagnosisData();
  }, []);

  // Filter feedback by the logged-in doctor's ID
  const ReportData = useSelector((state) => state.allreport.specificreport);
  const Report = ReportData.data || [];
  const opticianName = `${Report?.optician?.firstname} ${Report?.optician?.lastname}`;

  const reportRef = useRef();

  const handleDownloadPDF = () => {
    const element = reportRef.current;

    const opt = {
      margin: 0,
      filename: "eye-examination-report.pdf",
      image: { type: "png", quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
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
        },
        id
      )
    );

    setloading(false);
    setFeedbackSent(true);
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
            Right Eye Examination & Analysis
          </Card.Header>

          {/* الصور والعنوان وتاريخ الالتقاط */}
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
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
              <div className="d-flex flex-wrap gap-3 mb-4">
                {Report.eyeExamination.rightEye.images.map((link, idx) => (
                  <div
                    key={idx}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedImage(link)}
                  >
                    <img
                      src={link}
                      crossOrigin="anonymous"
                      loading="lazy"
                      alt={`Right Eye Image ${idx + 1}`}
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}

            {/* Modal for showing full image */}
            <Modal
              show={!!selectedImage}
              onHide={() => setSelectedImage(null)}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    borderRadius: "8px",
                  }}
                />
              </Modal.Body>
            </Modal>

            {/* بيانات الفحص */}
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

            {/* تحليل النموذج */}
            <div className="mt-4">
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
                        <table className="table table-bordered mt-2">
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
            </div>
            <Card className="mt-4 border-primary">
              <Card.Header
                onClick={() => setShowRightEyeFeedback(!showRightEyeFeedback)}
                className="bg-primary text-white d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                <span>Doctor's Feedback on Right Eye</span>
                {showRightEyeFeedback ? <ChevronUp /> : <ChevronDown />}
              </Card.Header>

              {showRightEyeFeedback && (
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>AI Prediction Correct?</strong>
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
                      <strong>Comment</strong>
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
                      <strong>Diagnosis</strong>
                    </Form.Label>
                    <Select
                      options={diagnosisOptions}
                      onChange={(selected) =>
                        setRightEyeFeedback({
                          ...rightEyeFeedback,
                          diagnosis: selected ? selected.value : "",
                        })
                      }
                      placeholder="Search and select diagnosis..."
                      isClearable
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Right Eye - Recommended Action</strong>
                    </Form.Label>
                    <Form.Select
                      value={rightEyeFeedback.recommendedAction}
                      onChange={(e) =>
                        setRightEyeFeedback({
                          ...rightEyeFeedback,
                          recommendedAction: e.target.value,
                        })
                      }
                    >
                      <option value="">Select an action...</option>
                      <option value="Refer to Ophthalmologist">
                        Refer to Ophthalmologist
                      </option>
                      <option value="Refer to other physicians">
                        Refer to other physicians
                      </option>
                      <option value="Follow-up in 1 year">
                        Follow-up in 1 year
                      </option>
                      <option value="No follow-up required">
                        No follow-up required
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={(e) => handleSendFeedBack(e)}
                  >
                    Submit Right Eye Feedback
                  </Button>
                </Card.Body>
              )}
            </Card>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header className="custom-card-header">
            Left Eye Examination & Analysis
          </Card.Header>

          {/* الصور والعنوان وتاريخ الالتقاط */}
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
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
              <div className="d-flex flex-wrap gap-3 mb-4">
                {Report.eyeExamination.leftEye.images.map((link, idx) => (
                  <div
                    key={idx}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedImage(link)}
                  >
                    <img
                      src={link}
                      crossOrigin="anonymous"
                      loading="lazy"
                      alt={`Left Eye Image ${idx + 1}`}
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}

            {/* Modal for showing full image */}
            <Modal
              show={!!selectedImage}
              onHide={() => setSelectedImage(null)}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    borderRadius: "8px",
                  }}
                />
              </Modal.Body>
            </Modal>

            {/* بيانات الفحص */}
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

            {/* تحليل النموذج */}
            <div className="mt-4">
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
                        <table className="table table-bordered mt-2">
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
            </div>
            <Card className="mt-4 border-primary">
              <Card.Header
                onClick={() => setShowLeftEyeFeedback(!showLeftEyeFeedback)}
                className="bg-primary text-white d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
              >
                <span>Doctor's Feedback on Left Eye</span>
                {showLeftEyeFeedback ? <ChevronUp /> : <ChevronDown />}
              </Card.Header>

              {showLeftEyeFeedback && (
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>AI Prediction Correct?</strong>
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
                      <strong>Comment</strong>
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
                    <Select
                      options={diagnosisOptions}
                      onChange={(selected) =>
                        setLeftEyeFeedback({
                          ...leftEyeFeedback,
                          diagnosis: selected ? selected.value : "",
                        })
                      }
                      placeholder="Search and select diagnosis..."
                      isClearable
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Recommended Action</strong>
                    </Form.Label>
                    <Form.Select
                      value={leftEyeFeedback.recommendedAction}
                      onChange={(e) =>
                        setLeftEyeFeedback({
                          ...leftEyeFeedback,
                          recommendedAction: e.target.value,
                        })
                      }
                    >
                      <option value="">Select an action...</option>
                      <option value="Refer to Ophthalmologist">
                        Refer to Ophthalmologist
                      </option>
                      <option value="Refer to other physicians">
                        Refer to other physicians
                      </option>
                      <option value="Follow-up in 1 year">
                        Follow-up in 1 year
                      </option>
                      <option value="No follow-up required">
                        No follow-up required
                      </option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={(e) => handleSendFeedBack(e)}
                  >
                    Submit Left Eye Feedback
                  </Button>
                </Card.Body>
              )}
            </Card>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-center mt-4 gap-3">
          <Button onClick={handleDownloadPDF} variant="danger">
            Download Report
          </Button>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <span style={{ fontStyle: "italic" }}>Optician: {opticianName}</span>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default PatientReport;

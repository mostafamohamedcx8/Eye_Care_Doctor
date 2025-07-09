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
  getREPORTSTATS,
  toggleArchivePatient,
} from "./../Redux/actions/Patientaction";
import notify from "../Hook/useNotification";
import { useTranslation } from "react-i18next";

const PatientTableUI = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [archiveLoading, setArchiveLoading] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDeleteId(null);
  };
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const MypatinetData = useSelector((state) => state.allpatient.mypatient);
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
    dispatch(getAllMyPatientPage(page));
  };

  const AllPatient = MypatinetData?.data || [];
  console.log("AllPatient", AllPatient);

  useEffect(() => {
    dispatch(getMypatient(10, keyword));
  }, [keyword]);

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
        notify(t("patienttableui.success_delete_message"), "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify(t("patienttableui.error_delete_message"), "error");
      }
    }
  }, [loading]);

  const handleToggleArchive = async (patientId) => {
    try {
      setArchiveLoading((prev) => ({ ...prev, [patientId]: true }));
      await dispatch(toggleArchivePatient(patientId));
      setRefreshData((prev) => !prev);
      notify(t("patienttableui.success_archive_message"), "success");
    } catch (error) {
      notify(t("patienttableui.error_archive_message"), "error");
    } finally {
      setArchiveLoading((prev) => ({ ...prev, [patientId]: false }));
    }
  };

  // useEffect لإعادة تحميل البيانات عند تغيير refreshData
  useEffect(() => {
    if (refreshData !== false) {
      // استدعاء دالة جلب البيانات مرة أخرى
      // مثال: dispatch(getAllPatients());
      dispatch(getMypatient(10, keyword));
    }
  }, [refreshData, keyword]);

  return (
    <>
      <Header />
      <NavBar />
      <Container className="mt-5">
        <h2 className="text-center mb-4 fw-bold button-color">
          {t("patienttableui.title")}
        </h2>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder={t("patienttableui.search_placeholder")}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{t("patienttableui.table_headers.index")}</th>
              <th>{t("patienttableui.table_headers.name")}</th>
              <th>{t("patienttableui.table_headers.date_of_birth")}</th>
              <th>{t("patienttableui.table_headers.ai_report_count")}</th>
              <th
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={t("patienttableui.tooltip_report_status")}
              >
                {t("patienttableui.table_headers.report_status")}
              </th>
              <th>{t("patienttableui.table_headers.tools")}</th>
            </tr>
          </thead>
          <tbody>
            {Loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  {t("patienttableui.loading_text")}
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
                          <span className="text-muted">
                            {" "}
                            {t("patienttableui.no_stats_text")}
                          </span>
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
                      onClick={(e) => handleToggleArchive(patient._id, e)}
                      disabled={archiveLoading[patient._id]}
                    >
                      <i className="bi bi-archive"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  {t("patienttableui.no_patients_text")}
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

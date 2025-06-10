import Header from "../component/Header";

import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import React from "react";
import { Row } from "react-bootstrap";
import NavBar from "../component/NavBar";
import ExaminationHistory from "../component/ExaminationHistory";
import Pagination from "../component/pagination";
import PatientCards from "../component/patientDetails";

const HistorySection = () => {
  return (
    <Row>
      <div className="hero-section">
        <div className="overlay hero-section">
          <div className="breadcrumb">
            <Link to="/Examination" className="breadcrumb-link">
              Home
            </Link>
            <span className="separator">/</span>
            <span className="active">Your History</span>
          </div>
          <h1 className="title">All your Eye Examination</h1>
        </div>
      </div>
    </Row>
  );
};
const History = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <HistorySection />
      <ExaminationHistory />
      <PatientCards />
      <Pagination />
      <Footer />
    </div>
  );
};

export default History;

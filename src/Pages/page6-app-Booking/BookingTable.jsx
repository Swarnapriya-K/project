import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";


const serviceDetails = [
  {
    id: 0,
    serviceName: "Detox Therapy Service",
    serviceMembers: ["Harper Luna", "Eliana Ivy", "Elena Naomi"]
  },
  {
    id: 1,
    serviceName: "Vacuum Suction Therapy",
    serviceMembers: ["Emma Lee", "Harper Luna", "Stella Zoe", "Bella Skylar"]
  },
  {
    id: 2,
    serviceName: "Deep Tissue Massage",
    serviceMembers: ["Amelia Ava", "Harper Luna", "Stella Zoe"]
  },
  {
    id: 3,
    serviceName: "Booking Payment Service",
    serviceMembers: ["Amelia Ava", "Olivia John", "Eliana Ivy"]
  },
  {
    id: 4,
    serviceName: "Wood/Metal Therapy",
    serviceMembers: ["Olivia John", "Emma Lee", "Bella Skylar"]
  },
  {
    id: 5,
    serviceName: "Face Therapy Service",
    serviceMembers: [
      "Amelia Ava",
      "Olivia John",
      "Emma Lee",
      "Riley Zoey",
      "Elena Naomi"
    ]
  },
  {
    id: 6,
    serviceName: "Radio Frequency Service",
    serviceMembers: ["Olivia John", "Riley Zoey", "Eliana Ivy"]
  },
  {
    id: 7,
    serviceName: "Perfect At-Home Facial",
    serviceMembers: ["Riley Zoey", "Elena Naomi"]
  },
  {
    id: 8,
    serviceName: "Thermal Therapy Service",
    serviceMembers: ["Stella Zoe", "Bella Skylar"]
  }
];

function BookingTable() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <div>
      <Row className=" table-head">
        <Col xl={4} lg={4} md={4} sm={4} className="tb-h1">
          <h4 className="header-text">1.Service & Date</h4>
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} className="tb-h2">
          <h4 className="header-text">2.Time</h4>
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} className="tb-h3">
          <h4 className="header-text">3.Details</h4>
        </Col>
        <Col xl={2} lg={2} md={2} sm={3} className="tb-h4">
          <h4 className="header-text"> 4.Done</h4>
        </Col>
      </Row>
      <Row
        style={{
          paddingTop: "10px",
          paddingBottom: "20px",
          backgroundColor: "white"
        }}
      >
        <Col xl={12}>
          <Row style={{ marginTop: "20px" }}>
            <Col xl={4} lg={3} md={3}>
              <label htmlFor="">Select Service *</label>
            </Col>
            <Col xl={8} lg={9} md={9}>
              <select
                style={{ width: "100%", height: "50px" }}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedService(e.target.value);
                  setSelectedMember("");
                }}
              >
                <option value={""}>Select Service</option>
                {serviceDetails.map((serviceDetail) => {
                  return (
                    <option value={serviceDetail.serviceNames}>
                      {serviceDetail.serviceName}
                    </option>
                  );
                })}
              </select>
              {selectedService && (
                <select>
                  <option value={""}>Select Members</option>
                  {serviceDetails
                    .filter((item) => item.serviceName === selectedService)[0]
                    .serviceMembers.map((member) => {
                      return <option value={member}>{member}</option>;
                    })}
                </select>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", position: "relative" }}>
            <Col xl={4} lg={3} md={3}>
              <label htmlFor="">Select Date*</label>
            </Col>
            <Col xl={8} lg={9} md={9}>
              <input
                style={{ width: "100%", height: "50px" }}
                type="date"
                name=""
                placeholder="Choose Date"
              ></input>
            </Col>
          </Row>
          <Row className="btn-row">
            <button className="continue-btn" onClick="">
              Continue
            </button>
          </Row>
          <div style={{}}></div>
        </Col>
      </Row>
    </div>
  );
}

export default BookingTable;

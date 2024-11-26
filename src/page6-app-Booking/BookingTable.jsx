import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

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
      <Row>
        <Col>
          <select
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
         <input class="" type="date" name="" placeholder="Choose Date"></input>
         <button onClick="">Continue</button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default BookingTable;

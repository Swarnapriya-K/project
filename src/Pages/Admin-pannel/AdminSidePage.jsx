import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Dashboard.css";

import { BsGearFill } from "react-icons/bs";

import { Link } from "react-router";

function AdminSidePage() {
  return (
    <div style={{padding:"10px"}} >
    
      <Row>
        <Col xl={3} className="col-xl-3-colm">
          <h1 style={{ fontweight: "300"}}>Dashboard</h1>
        </Col>
        <Col xl={5}>
          <ul>
            <Link className="Admin-sidebar">
              <li>Home</li>
              <li style={{ color: "#4291e7" }}>Dashboard</li>
            </Link>
          </ul>
        </Col>
        <Col className="gear-btn-div">
        <button className="gear-btn">
          <BsGearFill/>
        </button>
        </Col>
      </Row>
      <hr className="hr-line-design"/>
    </div>
  );
}

export default AdminSidePage;

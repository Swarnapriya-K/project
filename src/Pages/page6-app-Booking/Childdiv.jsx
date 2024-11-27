import React from "react";
import { Col, Row } from "react-bootstrap";
import SectionSecHeader from "../components/SectionSecHeader";

function Childdiv() {
  return (
    <div className="child-div">
      <div className="child-inner">
        <Row>
          <SectionSecHeader subtitle={"Time Shedule"} />
          <h1 className="booking-txt2">Working Hours</h1>
        </Row>
        <Row>
          <p>
            Lorem ipsum dolor sit amet, consecte tuer.auctor aliquet. Aenean
            sollicitudi, lorem quis bibendum auctor, nisi elit o nsequat ipsum,
            nec sagittis.
          </p>
        </Row>
        <Row className="child-row3">
          <Col style={{ color: "#F6526D" }} xl={4} lg={4}>
            <h5 className="child-booking-col1">Mon-Sat:</h5>
          </Col>
          <Col xl={8} lg={8}>
            <h5 className="child-booking-col2"> 10:00am - 08:00pm</h5>
          </Col>
        </Row>
        <Row className="child-row4">
          <Col style={{ color: "#F6526D" }} xl={4} lg={4}>
            <h5 className="child-booking-col3">Sunday</h5>
          </Col>
          <Col xl={8} lg={8}>
            <h5 className="child-booking-col4"> 11:00am - 06:00pm</h5>
          </Col>
        </Row>
        <div className="child-border-white"></div>
      </div>
    </div>
  );
}

export default Childdiv;

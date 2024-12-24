import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import mapimg from "../images/worlmap.png";

function AdminAnalytic() {
  return (
    <div>
      <Row className="Analytic-page">
        <Col xl={6}>
          <div className="map-heading">
            <span>
             <FontAwesomeIcon icon={faGlobe}/>
            </span>
      {" "}
            World Map
          </div>
          <div className="map-div">
            <img src={mapimg} className="map-img" alt="" />
          </div>
        </Col>
        <Col xl={6}>
          <div className="sale-Analytic"></div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminAnalytic;

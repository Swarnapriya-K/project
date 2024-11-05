import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import "./MyNavbar.css";



function Shopbaskat() {
  return (
    <div>
      <Container fluid p-0>
        <Row d-flex justify-content-between style={{ position: "relative" }}>
          <Col className="basket">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              className="basket-icon"
              
            />
          </Col>
          <span className="count">0</span>
          <Col>
            <button type="button" className="appbtn">
              Appointment
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Shopbaskat;

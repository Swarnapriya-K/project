import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router";
import "./checkout.css";
function Checkoutinnerheader() {
  return (
    <>
      <Container fluid>
        <Row className="rowsection">
          <h1 className="checkout-text">CheckOut</h1>
          <Link className="home-link" to={"/"}>
            Home
          </Link>
        </Row>
      </Container>
    </>
  );
}

export default Checkoutinnerheader;

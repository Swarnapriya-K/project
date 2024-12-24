import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import "./MyNavbar.css";
import { useSelector } from "react-redux";
import CartList from "./CartList";

function Shopbaskat() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalProductCount = useSelector(
    (state) => state.basket.products.length
  );

  return (
    <div>
      <Container fluid p-0>
        <Row
          className="d-flex justify-content-between"
          style={{ position: "relative", cursor: "pointer" }}
        >
          <Col className="basket">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              className="basket-icon"
              onClick={handleShow}
            />
          </Col>
          <span className="count">{totalProductCount}</span>
          <Col>
            <button type="button" className="appbtn">
              Appointment
            </button>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        className="offcanvas-bas"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton className="basketbtn ">
          <Offcanvas.Title>Basket ({totalProductCount})</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <CartList />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Shopbaskat;

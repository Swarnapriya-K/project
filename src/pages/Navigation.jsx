import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Offcanvas,
  Button
} from "react-bootstrap";

import Mainmenu from "./Mainmenu";
import Shopbaskat from "./Shopbaskat";
import "./MyNavbar.css";

function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    console.log("button clicked")
    setShowOffcanvas((prev) => !prev);
  }

  return (
    <Container fluid className="g-0" style={{ position: "relative" }}>
      <Container fluid className="g-0 navtop">
        <header>
          <Navbar expand="lg" bg="white" className="genrl-main-head nav-top">
            <Container>
              <Row className="align-items-center w-100 logo">
                {/* Logo and Toggler */}
                <Col lg={2}>
                  <div className="d-flex align-items-center">
                    <a
                      href="https://dictate.webinane.com/"
                      className="genrl-logo"
                    >
                      <img
                        src="https://dictate.webinane.com/wp-content/uploads/2022/03/Dictate-logo-new.svg"
                        alt="Dictate WordPress Theme Demo"
                      />
                    </a>
                    <Button
                      variant="light"
                      className="navbar-toggler"
                      onClick={toggleOffcanvas}
                      aria-controls="offcanvasNavbar"
                      aria-expanded={showOffcanvas}
                    >
                      <span className="navbar-toggler-icon"></span>
                      <span className="navbar-toggler-icon"></span>
                      <span className="navbar-toggler-icon"></span>
                    </Button>
                  </div>
                </Col>
                <Col md={7}>
                  <Mainmenu />
                </Col>

                {/* Basket and Appointment Button */}
                <Col md={3}>
                  <Shopbaskat />
                </Col>
              </Row>
            </Container>
          </Navbar>

          {/* Offcanvas Menu */}
          <Offcanvas
            show={showOffcanvas}
            onHide={toggleOffcanvas}
            placement="end"
            id="offcanvasNavbar"
            className="popup-items woocommerce"
          >
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link
                  href="https://dictate.webinane.com/"
                  style={{ color: "white" }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/shop/"
                  style={{ color: "white" }}
                >
                  Shop
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/shop/"
                  style={{ color: "white" }}
                >
                  Service
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/blog/"
                  style={{ color: "white" }}
                >
                  Blog
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/shop/"
                  style={{ color: "white" }}
                >
                  Pages
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/about/"
                  style={{ color: "white" }}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  href="https://dictate.webinane.com/contact/"
                  style={{ color: "white" }}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </header>
      </Container>
    </Container>
  );
}

export default Header;

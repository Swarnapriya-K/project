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
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Mainmenu from "./Mainmenu";
import Shopbaskat from "./Shopbaskat";
import "./MyNavbar.css";

function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas((prev) => !prev);
  };

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
                    <Link to="/" className="genrl-logo">
                      <img
                        src="https://dictate.webinane.com/wp-content/uploads/2022/03/Dictate-logo-new.svg"
                        alt="Dictate WordPress Theme Demo"
                      />
                    </Link>
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
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/shop" style={{ color: "white" }}>
                  Shop
                </Nav.Link>
                <Nav.Link as={Link} to="/services" style={{ color: "white" }}>
                  Services
                </Nav.Link>
                <Nav.Link as={Link} to="/blog" style={{ color: "white" }}>
                  Blog
                </Nav.Link>
                <Nav.Link as={Link} to="/pages" style={{ color: "white" }}>
                  Pages
                </Nav.Link>
                <Nav.Link as={Link} to="/about" style={{ color: "white" }}>
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" style={{ color: "white" }}>
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

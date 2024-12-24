import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import "./MyNavbar.css";

function Mainmenu() {
  const [showHome, setShowHome] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <Container fluid>
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="genrl-main-menu d-flex justify-content-center"
      >
        <Nav className="Navstyle">
          <Nav.Link as={Link} to="/" className="px-2 nav-dropdown">
            Home
          </Nav.Link>
          <NavDropdown
            title="Shop"
            id="shop-dropdown"
            className="nav-dropdown px-2"
            show={showShop}
            onMouseEnter={() => setShowShop(true)}
            onMouseLeave={() => setShowShop(false)}
          >
            <NavDropdown.Item as={Link} to="/shop" className="dropdown-style">
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Shop
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/checkout"
              className="dropdown-style"
            >
              Checkout
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/product-detail"
              className="dropdown-style"
            >
              Product Detail
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Services"
            id="services-dropdown"
            className="nav-dropdown px-2"
            show={showServices}
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <NavDropdown.Item
              as={Link}
              to="/service"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Service Style 1
            </NavDropdown.Item>
            
          </NavDropdown>

          <NavDropdown
            title="Blog"
            id="blog-dropdown"
            className="nav-dropdown px-2"
            show={showBlog}
            onMouseEnter={() => setShowBlog(true)}
            onMouseLeave={() => setShowBlog(false)}
          >
            <NavDropdown.Item
              as={Link}
              to="/our-blog"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Our Blog
            </NavDropdown.Item>
            
          </NavDropdown>

          <NavDropdown
            title="Pages"
            id="pages-dropdown"
            className="nav-dropdown px-2"
            show={showPages}
            onMouseEnter={() => setShowPages(true)}
            onMouseLeave={() => setShowPages(false)}
          >
            <NavDropdown.Item
              as={Link}
              to="/appointment"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Appointment
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/team" className="dropdown-style">
              Team
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/team-detail"
              className="dropdown-style"
            >
              Team Detail
            </NavDropdown.Item>

            {/* Gallery Dropdown with Nested Items */}
            <NavDropdown
              title={<span style={{ color: "white" }}>Gallery</span>}
              id="gallery-dropdown"
              className="nav-dropdown px-2 dropdown-style"
              show={showGallery}
              onClick={() => setShowGallery(!showGallery)}
              drop="end"
            >
              <NavDropdown.Item
                as={Link}
                to="/gallery-style-1"
                className="dropdown-style"
              >
                Gallery Style 1
              </NavDropdown.Item>
             
            </NavDropdown>

           
          </NavDropdown>

          <Nav.Link as={Link} to="/about" className="px-2 nav-dropdown">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className="px-2">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  );
}

export default Mainmenu;

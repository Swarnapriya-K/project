import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
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
          <NavDropdown
            title="Home"
            id="home-dropdown"
            className="nav-dropdown px-2"
            show={showHome}
            onMouseEnter={() => setShowHome(true)}
            onMouseLeave={() => setShowHome(false)}
          >
            <NavDropdown.Item
              href="https://dictate.webinane.com/"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Home Page 1
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/home-page-2/"
              className="dropdown-style"
            >
              Home Page 2
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Shop"
            id="shop-dropdown"
            className="nav-dropdown px-2"
            show={showShop}
            onMouseEnter={() => setShowShop(true)}
            onMouseLeave={() => setShowShop(false)}
          >
            <NavDropdown.Item
              href="https://dictate.webinane.com/shop/"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Shop
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/checkout/"
              className="dropdown-style"
            >
              Checkout
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/product/massage-sofa/"
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
              href="https://dictate.webinane.com/service-style-1/"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Service Style 1
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/service-style-2/"
              className="dropdown-style"
            >
              Service Style 2
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/service-style-3/"
              className="dropdown-style"
            >
              Service Style 3
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/service/detox-therapy-service/"
              className="dropdown-style"
            >
              Service Detail
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
              href="https://dictate.webinane.com/blog/"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Our Blog
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/how-to-apply-a-gold-facial-mask/"
              className="dropdown-style"
            >
              Blog Detail
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
              href="https://dictate.webinane.com/appointment/"
              className="dropdown-style"
            >
              <FontAwesomeIcon
                icon={faCaretUp}
                aria-hidden="true"
                className="caretup"
              />
              Appointment
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/team/"
              className="dropdown-style"
            >
              Team
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://dictate.webinane.com/team/eliana-ivy/"
              className="dropdown-style"
            >
              Team Detail
            </NavDropdown.Item>

            {/* Gallery Dropdown with Nested Items */}
            <NavDropdown
              title={<span style={{ color: "white" }}>Gallery</span>}
              id="gallery-dropdown"
              className="nav-dropdown px-2 dropdown-style" // Gallery styled as dropdown item
              show={showGallery}
              onClick={() => setShowGallery(!showGallery)} // Toggle dropdown on click
              drop="end"
            >
              <NavDropdown.Item
                href="https://dictate.webinane.com/gallery-style-1/"
                className="dropdown-style"
              >
                Gallery Style 1
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://dictate.webinane.com/gallery-style-2/"
                className="dropdown-style"
              >
                Gallery Style 2
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown.Item
              href="https://dictate.webinane.com/gallery/deep-tissue-massage/"
              className="dropdown-style"
            >
              Gallery Detail
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="https://dictate.webinane.com/about/" className="px-2">
            About
          </Nav.Link>
          <Nav.Link
            href="https://dictate.webinane.com/contact/"
            className="px-2"
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  );
}

export default Mainmenu;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logoimg from "../images/Dictate-logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaMapMarker } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import "./footer.css";

export const Footer = () => {
  return (
    <Container style={{ paddingTop: "50px" }}>
      <Row className="mb-5 header-row">
        <Col xl={6} lg={6} md={6} sm={12}>
          <img src={logoimg} alt="" />
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} className="media">
          <div>
            <button className="fbbutton">
              <FaFacebook size={20} color="#ffffff" />
            </button>
          </div>
          <div className="mx-1">
            <button className="twbutton">
              <FaTwitter size={20} color="#ffffff" />
            </button>
          </div>
          <div>
            <button className="pintbutton">
              <FaPinterest size={20} color="#ffffff" />
            </button>
          </div>
          <div className="mx-1">
            <button className="linkbutton">
              <FaLinkedinIn size={20} color="#ffffff" />
            </button>
          </div>
        </Col>
      </Row>
      <Row className="Content-row">
        <Col xl={4} className="colpadding sizepadding">
          <div>
            <Row>
              <h2 className="abttext">About Us</h2>
            </Row>
            <Row>
              <p>
                Lorem ipsum dolor sit amet, consecte tuer.auctor aliquet. Aenean
                sollicitudi, lorem quis bibendum auctor. Lorem lie ipsum dolor
                sit amet, consecte unlieu tuer.auctor aliquet.
              </p>
            </Row>
          </div>
        </Col>
        <Col xl={4} className="colpadding ">
          <div>
            <Row>
              <h2 className="abttext sizepadding">Contact Us</h2>
            </Row>
            <Row>
              {/* Map Marker Icon */}
              <Row className="mt-3">
                <Col xl={3} lg={1} md={1} className="sizecolmn1">
                  <button className="fabuttons">
                    <FaMapMarker size={20} color="black" />
                  </button>
                </Col>
                <Col xl={9} lg={10} md={11} className="sizecolmn2">
                  <p className="footer-para1">
                    Parkway, Solent Business Park, Whiteley, Hants, PO15 7AN
                  </p>
                </Col>
              </Row>

              {/* Envelope Icon */}
              <Row className="mt-3">
                <Col xl={3} lg={1} md={1} className="sizecolmn1">
                  <button className="fabuttons">
                    <FaEnvelope size={20} color="black" />
                  </button>
                </Col>
                <Col xl={9} lg={10} md={10} className="sizecolmn2">
                  <p className="footer-para2">support@webinane.com</p>
                </Col>
              </Row>

              {/* Mobile Icon */}
              <Row className="mt-3">
                <Col xl={3} lg={1} md={1} className="sizecolmn1">
                  <button className="fabuttons">
                    <FaMobile size={20} color="black" />
                  </button>
                </Col>
                <Col className="sizecolmn2" xl={9} lg={10} md={10}>
                  <p className="footer-para3">+1 9175610778</p>
                </Col>
              </Row>
            </Row>
          </div>
        </Col>
        <Col xl={4} className="colpadding sizecolmn-padding ">
          <div>
            <Row>
              <h2 className="abttext sizepadding">Opening Hours</h2>
            </Row>
            <Row className="time-row1">
              <Col xl={7} lg={6} md={6} className="day1">
                <h3 className="day-para1">Monday-Wednesday:</h3>
              </Col>
              <Col xl={5} lg={6} md={6} className="timecol1">
                <h5 className="time1">11am-7pm</h5>
              </Col>
            </Row>
            <Row className="time-row2">
              <Col xl={7} lg={6} md={6} className="day2">
                <h3 className="day-para1">Thursday-Saturday:</h3>
              </Col>
              <Col xl={5} lg={6} md={6} className="timecol2">
                <h5 className="time2">11am-8pm</h5>
              </Col>
            </Row>
            <Row className="time-row3">
              <Col xl={4} lg={6} md={6} className="day3">
                <h3 className="day-para1">Sunday</h3>
              </Col>
              <Col xl={8} lg={6} md={6} className="timecol3">
                <h5 className="time3">11:30am-6pm</h5>
              </Col>
            </Row>
            <Row>
              <h3 className="bookingtext">Book Appointment</h3>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <h4 className="copyright">Copyright © 2024, Dictate Powered by Webinane.</h4>
      </Row>
    </Container>
  );
};

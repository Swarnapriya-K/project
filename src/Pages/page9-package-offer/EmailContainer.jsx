import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function EmailContainer() {
  return (
    <Container fluid className="g-0">
      <div className="email-container">
        <Container className="inner-email-container">
          <Row className="mail-row-1">
            <div className="message-box-div">
              <FontAwesomeIcon icon={faEnvelope} className="message-box" />
            </div>
          </Row>
          <Row className="mail-row-2">
            <div className="">
              <h1>Subscribe To Our NewSletter</h1>
            </div>
          </Row>
          <Row className="mail-row-3">
            <div className="">
              <h4 className="mail-text">
                Subscribe to our mailing list to be the first to know about new
                products
              </h4>
            </div>
          </Row>
          <Row style={{position:"relative"}}>
            <div className="email-box-div">
              <button className="email-input-box">
                <h5 className="email-input-text-styling">
                  Enter Your Email Address
                </h5>
              </button>
            </div>
            <div>
              <button className="subscribe-btn">
                <h5>Subscribe</h5>
              </button>
            </div>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

export default EmailContainer
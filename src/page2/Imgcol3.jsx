import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import clock from "../images/clock.svg";

function Imgcol3() {
  return (
    <div className="textcol">
      <h3 className="sec2-text1">Welcome Spa and Salon</h3>
      <h1 className="sec2-text2">Salon Offer a Wide Range of Services</h1>
      <p className="sec2-text3">
        Lorem ipsum dolor sit amet, consectetuer. Proin gravida nibh vel velit
        auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi
        elit onsequat ipsum, nec sagittis sem nibh id elitt nibh vulputate lie t
        Aenean sollicitudin, lorem quis bib.
      </p>
      <div>
        <Row className="mt-5">
          <Col lg={1}>
            <img src={clock} alt="" className="clock" />
          </Col>
          <Col lg={10}>
            <h4 className="sec2-timing">Monday - Friday 08:00-19:00</h4>
            <p className="sec2-para">Saturday and Sunday - CLOSED</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Imgcol3;

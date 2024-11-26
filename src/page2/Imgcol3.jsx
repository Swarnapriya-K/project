import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import clock from "../images/clock.svg";
import SectionSecHeader from "../components/SectionSecHeader";

function Imgcol3() {
  return (
    <div className="textcol">
      <SectionSecHeader
        title={"Salon offer a Wide Range of Services"}
        subtitle={"Welcome Spa and Salon"}
      />

      <p className="sec2-text3">
        Lorem ipsum dolor sit amet, consectetuer. Proin gravida nibh vel velit
        auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi
        elit onsequat ipsum, nec sagittis sem nibh id elitt nibh vulputate lie t
        Aenean sollicitudin, lorem quis bib.
      </p>
      <div>
        <Row className="mt-5">
          <Col lg={1} md={1} className="clockstyle">
            <img src={clock} alt="" className="clock" />
          </Col>
          <Col lg={10} md={10}>
            <h4 className="sec2-timing">Monday - Friday 08:00-19:00</h4>
            <p className="sec2-para">Saturday and Sunday - CLOSED</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Imgcol3;

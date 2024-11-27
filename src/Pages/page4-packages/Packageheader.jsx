import React from 'react'
import { Row,Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Packageheader() {
  return (
    <div>
      <Container fluid className="">
        <Row className="headerrow">
          <Col xl={6} lg={12} sm={12}>
            <h3 className="sec2-text1 mt-3">Welcome Spa and Salon</h3>
            <h1 className="sec2-text2 ">Quality Packages</h1>
          </Col>
          <Col>
            <Row>
              <Col xl={10} lg={5} sm={12}>
                <h4 className="headerpackage">View all Packages</h4>
              </Col>
              <Col xl={2} lg={7}>
                <div className="addmark">
                  <FontAwesomeIcon icon={faPlus} className="add" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Packageheader;
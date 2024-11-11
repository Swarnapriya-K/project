import React from 'react'
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Imgcol1 from './Imgcol1';
import Imgcol2 from './Imgcol2';
import Imgcol3 from './Imgcol3';
import CircleSlider from './CircleSlider';


function Innercontainer() {
  return (
    <div >
      <Container m-auto style={{position:"relative"}}>
        <CircleSlider/>
        <Row> 
          <Col xl={3} md={6}>
            <Imgcol1 />
          </Col>
          <Col xl={3} md={6}>
            <Imgcol2 />
          </Col>

          <Col xl={6} md={12}>
            <Imgcol3 />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Innercontainer
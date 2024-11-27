import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ColLeft from './ColLeft';
import Colright from './Colright';
import Childdiv from './Childdiv';

function ContainerSlot() {
  return (
    <div>
      <Container fluid style={{ backgroundColor: "#FFFCC8", width: "100%" }}>
        <div className='slot-inner-container'>
          <Row className="slot-row">
            <Col xl={6} className='img-colmn'>
              <ColLeft />
              <Childdiv/>
            </Col>
            <Col xl={6}>
            <Colright/>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ContainerSlot
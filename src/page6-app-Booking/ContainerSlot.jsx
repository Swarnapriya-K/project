import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ColLeft from './ColLeft';

function ContainerSlot() {
  return (
    <div>
      <Container fluid style={{ backgroundColor: "#FFFCC8", width: "100%" }}>
        <div className='slot-inner-container'>
          <Row className="slot-row">
            <Col>
              <ColLeft />
            </Col>
            <Col>
            
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ContainerSlot
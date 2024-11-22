import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ColLeft from './ColLeft';

function ContainerSlot() {
  return (
    <div>
      <Container fluid
        style={{ backgroundColor: "#FFFCC8", width: "100%"}}
      >
        <Row className=''>
          <Col>
          <ColLeft/>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContainerSlot
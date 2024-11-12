import React from 'react'
import Serviceheader from './Serviceheader';
import { Container } from 'react-bootstrap';
import Servicecontainer from './Servicecontainer';

function Servicepage() {
  return (
    <div>
      <Container fluid className='service-container'>
        <Serviceheader />
        <Servicecontainer/>
      </Container>
    </div>
  );
}

export default Servicepage;
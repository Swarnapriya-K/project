import React from 'react'
import { Container } from 'react-bootstrap';
import Servicecontainer from './Servicecontainer';

import SectionHeader from '../components/SectionHeader';

function Servicepage() {
  return (
    <div>
      <Container fluid className="service-container">
        <SectionHeader
          title={"Salon Services"}
          subtitle={"Welcome Spa and Salon"}
        />
        <Servicecontainer />
      </Container>
    </div>
  );
}

export default Servicepage;
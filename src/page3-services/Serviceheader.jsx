import React from 'react'
import { Container } from 'react-bootstrap'
import logoimg from "../images/lotus-logo.svg";

function Serviceheader() {
  return (
    <div>
      <Container fluid className="text-center ">
        <div>
          <img src={logoimg} alt="" />
        </div>
        <h3 className="sec2-text1 mt-3">Welcome Spa and Salon</h3>
        <h1 className='sec2-text2 '>Salon Services</h1>
      </Container>
    </div>
  );
}

export default Serviceheader;
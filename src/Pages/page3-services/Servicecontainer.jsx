import React from 'react'
import { Container } from 'react-bootstrap'
import servicebg from "../images/man-1.jpg";
import towelflower from "../images/towel-flower.png"
import Servicebox from './Servicebox';

function Servicecontainer() {
  return (
    <div>
      <Container fluid className="mt-5 position-relative">
        <div className="text-center mt-5">
          <img src={servicebg} alt="" className='manimg' />
        </div>
        <div>
          <img src={towelflower} alt="" className="position-absolute towel-flower" />
        </div>
        <Servicebox/>
      </Container>
    </div>
  );
}

export default Servicecontainer;
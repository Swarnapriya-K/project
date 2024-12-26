import React from "react";
import { Container } from "react-bootstrap";

import HorizontalScroller from "../page5-products/HorizontalScroller";
import { Footer } from "./Footer";
import Header from "./Navigation";

function Shoping() {
  return (
    <>
      <Container fluid>
       
        <div>
          <HorizontalScroller />
        </div>
        <div>
          <Footer />
        </div>
      </Container>
    </>
  );
}

export default Shoping;

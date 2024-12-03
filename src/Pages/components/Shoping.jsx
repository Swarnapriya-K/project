import React from "react";
import { Container } from "react-bootstrap";

import HorizontalScroller from "../page5-products/HorizontalScroller";
import Header from "./Navigation";
import { Footer } from "./Footer";

function Shoping() {
  return (
    <>
      <Container fluid>
        <div>
          <Header />
        </div>

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

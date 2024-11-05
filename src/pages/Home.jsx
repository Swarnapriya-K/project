import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoTransitionExample from "./Carousal";
import Navigation from "./Navigation";

function Home() {
  return (
    <div>
      <Container fluid className="p-0 ">
        <div>
      
          <NoTransitionExample />
        </div>
      </Container>
    </div>
  );
}

export default Home;

import React from "react";
import Container from "react-bootstrap/Container";
import NoTransitionExample from "./Carousal";


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

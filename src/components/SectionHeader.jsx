import React from "react";
import { Container } from "react-bootstrap";
import logoimg from "../images/lotus-logo.svg";


function SectionHeader({subtitle, title}) {
  return (
    <div>
      <Container fluid className="text-center ">
        <div>
          <img src={logoimg} alt="" />
        </div>
        <h3 className="sec2-text1 mt-3">{subtitle}</h3>
        <h1 className="sec2-text2 ">{title}</h1>
      </Container>
    </div>
  );
}

export default SectionHeader;

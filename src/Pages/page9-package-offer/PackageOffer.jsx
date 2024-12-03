import React from "react";
import packagebanner1 from "../images/package-1.jpg";
import packagebanner2 from "../images/package-2.jpg";
import OfferContainer from "./OfferContainer";
import { Col, Container, Row } from "react-bootstrap";
import EmailContainer from "./EmailContainer";

const packageoffer = [
  {
    id: 1,
    packagebanner: packagebanner1,
    bgcolor: "#D2F2F8E8",
    packagetext: "To Get The Best of Everything From Head to Toe",
    offer: "Get 20% Off Package",
    buttontext: "Buy As a Gift Card",
    buttoncolor: "black"
  },
  {
    id: 2,
    packagebanner: packagebanner2,
    bgcolor: " #FFE5E0E8",
    packagetext: "To Get The Best of Everything From Head to Toe",
    offer: "Get 20% Off Package",
    buttontext: "Buy As a Gift Card",
    buttoncolor: "#F6526D"
  }
];

function PackageOffer() {
  return (
    <>
      <Container>
        <Row>
          {packageoffer.map((item) => {
            return (
              <Col xl={6} >
                <OfferContainer
                  packagebanner={item.packagebanner}
                  bgcolor={item.bgcolor}
                  packagetext={item.packagetext}
                  offer={item.offer}
                  buttontext={item.buttontext}
                  buttoncolor={item.buttoncolor}
                />
              </Col>
            );
          })}
        </Row>
        
      </Container>
      <Container fluid className="email-main-container g-0">
        <EmailContainer/>
      </Container>
    </>
  );
}

export default PackageOffer;

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Buttons from "./Buttons";
import Packageheader from "./Packageheader";
import PackageContainer from "./PackageContainer";
import images1 from "../images/co-1.jpg";
import images2 from "../images/co-2.jpg";
import images3 from "../images/co-3.jpg";
import images4 from "../images/co-4.jpg";
import images5 from "../images/co-5.jpg";
import images6 from "../images/co-6.jpg";

const packageDetails = [
  {
    id: 0,
    packageName: "Detox Therapy Service",
    packageDetails: [
      "Spa Access",
      "55 Minute Treatment",
      "1 Course Light Lunch"
    ],
    amount: 90,
    coimg: images1
  },
  {
    id: 1,
    packageName: "Vacuum Suction Therapy",
    packageDetails: [
      "French Fork Beard",
      "Ductail Beard",
      "Circle Beard",
      "Goatee Beard"
    ],
    amount: 149,
    coimg: images2
  },
  {
    id: 2,
    packageName: "Deep Tissue Massage",
    packageDetails: [
      "French Fork Beard",
      "Ductail Beard",
      "Circle Beard",
      "Goatee Beard"
    ],
    amount: 60,
    coimg: images3
  },
  {
    id: 3,
    packageName: "Booking Payment Service",
    packageDetails: [
      "French Fork Beard",
      "Ductail Beard",
      "Circle Beard",
      "Goatee Beard"
    ],
    amount: 100,
    coimg: images4
  },
  {
    id: 4,
    packageName: "Face Therapy Service",
    packageDetails: [
      "French Fork Beard",
      "Ductail Beard",
      "Circle Beard",
      "Goatee Beard"
    ],
    amount: 199,
    coimg: images5
  },
  {
    id: 5,
    packageName: "Radio Frequency Service",
    packageDetails: [
      "French Fork Beard",
      "Ductail Beard",
      "Circle Beard",
      "Goatee Beard"
    ],
    amount: 70,
    coimg: images6
  }
];


console.log(packageDetails[4].packageName)

let selected = packageDetails.filter((item) => item.id === 3)[0]
console.log(selected)

function PackageList() {


  const [activestate, setactivestate] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(packageDetails[0])

  const handlePackageClick = (id) => {
    setactivestate(id);
    setSelectedPackage(packageDetails.filter((item) => item.id === id)[0]);
  };
  return (
    <Container
      fluid
      className="package-container"
   
    >
      <Container className="inner-container">
        <Packageheader />
        <div>
          <Row>
            <Col lg={3} md={12} className="buttonstyle">
              <Buttons
                activestate={activestate}
                packageDetails={packageDetails}
                handlePackageClick={handlePackageClick}
              />
            </Col>
            <Col lg={9} md={12}>
              <PackageContainer selectedPackage={selectedPackage} />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}

export default PackageList;

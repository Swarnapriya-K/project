import React from "react";
import { Row } from "react-bootstrap";
import serviceimg1 from "../images/service1.svg";
import serviceimg2 from "../images/service2.svg";
import serviceimg3 from "../images/service3.svg";
import serviceimg4 from "../images/service4.svg";

let serviceDetials = [
  {
    heading: "Detox Therapy Service",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendi vel",
    img: serviceimg1,
    color: "rgb(211 231 243)",
    className: "service1",
    imgclass: "serviceimage1",
    imgres: "imgres"
  },
  {
    heading: "Vaccum Suction Therapy",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendi vel",
    img: serviceimg2,
    color: "rgb(251 218 222)",
    className: "service2",
    imgclass: "serviceimage2",
    imgsize: "imgsizing",
    imgres: "imgres"
  },
  {
    heading: "Wood/Metal Therapy",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendi vel",
    img: serviceimg3,
    color: "#ededb2",
    className: "service3",
    imgclass: "serviceimage3",
    imgres: "imgres"
  },
  {
    heading: "Face Therapy Service",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendi vel",
    img: serviceimg4,
    color: "#ddd7f5",
    className: "service4",
    imgclass: "serviceimage4",
    imgres: "imgres"
  }
];

function Servicebox() {
  return (
    <div className="servicebox">
      <Row>
        <div>
          {serviceDetials.map((item, index) => {
            const delayClass = `delay-${index}`;
            return (
              <div
                style={{ backgroundColor: item.color }}
                className={`service-item ${item.className} ${delayClass}`}
                key={index}
              >
                <h2 className="headingbox">{item.heading}</h2>
                <p className="boxpara">{item.para}</p>
                <div className={item.imgclass}>
                  <img
                    src={item.img}
                    alt=""
                    className={`${item.imgsize} ${item.imgres}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Row>
    </div>
  );
}

export default Servicebox;

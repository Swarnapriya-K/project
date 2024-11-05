import React, { useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";
import Carimg1 from "../images/ddd.jpg";
import Carimg2 from "../images/slide-2-5.jpg";
import Carimg3 from "../images/slide-1-1.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Hometext from "./Hometext";
import Navigation from "./Navigation";
import Header from "./Navigation"


function NoTransitionExample() {
  const carouselRef = useRef(null);

  

  return (
    <Container fluid className="p-0">
      <Carousel
        ref={carouselRef}
        slide={false}
        controls={false}
        indicators={false}
      >
        <Carousel.Item>
          <div
            className="bg-img"
            style={{
              backgroundImage: `url(${Carimg1})`,
              height: "900px",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
          <Header/>
          </div>
          <Carousel.Caption>
            <Hometext />
          </Carousel.Caption>
          
        </Carousel.Item>

        {/* <Carousel.Item>
          <div
            className="bg-img"
            style={{
              backgroundImage: `url(${Carimg2})`,
              height: "900px",
              backgroundSize: "cover",
              // backgroundPosition: "center"
            }}
          >
           <Header/>
          </div>
          <Carousel.Caption >
            <Hometext />
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="bg-img"
            style={{
              backgroundImage: `url(${Carimg3})`,
              height: "900px",
              backgroundSize: "cover",
              // backgroundPosition: "center"
            }}
          >
            <Header/>
          </div>
          <Carousel.Caption>
            <Hometext />
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>

      {/* Custom Indicators with Left and Right Arrows
      <div className="carousel-custom-indicator">
        <button className="left-arrow" onClick={goToPrev}>
          &#10094;
        </button>
        <button className="right-arrow" onClick={goToNext}>
          &#10095;
        </button>
      </div> */}
    </Container>
  );
}

export default NoTransitionExample;

import { React, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Hometext from "./Hometext";
import Header from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

function NoTransitionExample() {
  const carouselRef = useRef(null);

  // Function to go to the previous slide
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  // Function to go to the next slide
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  return (
    <Container fluid className="p-0">
      <Carousel
        slide={false}
        controls={false}
        indicators={false}
        responsive
        ref={carouselRef}
      >
        <Carousel.Item>
          <div className="bg-img1">
            <Header />
            <Hometext />

            <button type="button" className="nextbtn" onClick={handleNext}>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#000000" }}
              />
            </button>
            <button type="button" className="prevbtn" onClick={handlePrev}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="bg-img2">
            <Header />
            <Hometext />
            <button type="button" className="nextbtn" onClick={handleNext}>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#000000" }}
              />
            </button>
            <button type="button" className="prevbtn" onClick={handlePrev}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="bg-img3">
            <Header />
            <Hometext />
            <button type="button" className="nextbtn" onClick={handleNext}>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#000000" }}
              />
            </button>
            <button type="button" className="prevbtn" onClick={handlePrev}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default NoTransitionExample;

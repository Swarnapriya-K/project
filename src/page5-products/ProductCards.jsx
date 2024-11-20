import { Card, Col, Row, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HorizontalScroll.css"; // Add your custom styles for .shopping-basket here
import { FaShoppingBasket } from "react-icons/fa"; // Install react-icons if not already done: npm install react-icons

const ProductCards = ({ products }) => {
  return (
    <Swiper
      spaceBetween={20}
      loop={true}
      freeMode={true} // Enable free mode for smoother movement
      freeModeMomentum={true} // Enable momentum when swiping
      freeModeMomentumRatio={0.1} // Adjust the momentum (slower stop)
      freeModeSticky={true} // Make the swiper "stick" to a point when stopped
      touchReleaseOnEdges={true} // Allows momentum on edges
      breakpoints={{
        // when window width is >= 320px (small screens like phones)
        320: {
          slidesPerView: 1, // Show 1 slide
          spaceBetween: 10 // Space between slides
        },
        // when window width is >= 480px (larger phones)
        480: {
          slidesPerView: 2, // Show 2 slides
          spaceBetween: 20 // Space between slides
        },
        // when window width is >= 768px (tablets)
        768: {
          slidesPerView: 2, // Show 3 slides
          spaceBetween: 20 // Space between slides
        },
        // when window width is >= 1024px (desktops)
        1024: {
          slidesPerView: 4, // Show 4 slides
          spaceBetween: 20 // Space between slides
        }
      }}
      className="product-swiper"
    >
      {products.map((item, index) => (
        <SwiperSlide key={index}>
          <Card className="card">
            <Card.Img variant="top" src={item.picture} />
            {item.discountprice && (
              <button
                style={{ color: "white" }}
                className={`${item.discountstyle}`}
              >
                {item.discountpercentage}
                <p className="text-discount">Discount</p>
              </button>
            )}
            <Card.Body>
              <div className="product-rating">
                <div
                  className="star-rating"
                  role="img"
                  aria-label="Rated 5.00 out of 5"
                >
                  <span>
                    Rated <strong className="rating">5.00</strong> out of 5
                  </span>
                </div>
                <span>(1)</span>{" "}
              </div>
              <Card.Title>{item.productname}</Card.Title>
              <Row>
                <Col xl={4}>
                  <Card.Text className="productrate">${item.price}</Card.Text>
                </Col>
                <Col xl={4}>
                  <Card.Text className="discount">
                    {item.discountprice}
                  </Card.Text>
                </Col>
              </Row>
              {/* Shopping basket button */}
              <Button
                variant="primary"
                className="shopping-basket"
                title="Add to Basket"
              >
                <FaShoppingBasket />
              </Button>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCards;

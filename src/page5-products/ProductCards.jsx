import { Card, Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper styles
import "swiper/css/pagination"; // Pagination styles
import { Pagination } from "swiper/modules";
import "./HorizontalScroll.css"; // Your custom CSS

const ProductCards = ({ products }) => {
  return (
    <Swiper
      spaceBetween={20} // Space between slides
      slidesPerView={4} // Show 4 cards at a time
      loop={true} // Infinite scrolling
      className="product-swiper"
    >
      {products.map((item, index) => (
        <SwiperSlide key={index}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.picture} />
            <Card.Body>
              <Card.Title>{item.productname}</Card.Title>
              <Row>
                <Col xl={4}>
                  <Card.Text className="productrate">${item.price}</Card.Text>
                </Col>
                <Col xl={4}>
                  <Card.Text className="discount">{item.discountprice}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCards;

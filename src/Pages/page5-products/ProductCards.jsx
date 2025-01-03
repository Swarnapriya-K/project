import { Card, Col, Row, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HorizontalScroll.css";
import { FaShoppingBasket } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/basketSlice";
const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <Swiper
      style={{ paddingBottom: "190px" }}
      spaceBetween={20}
      loop={true}
      freeMode={true}
      freeModeMomentum={true}
      freeModeMomentumRatio={0.1}
      freeModeSticky={true}
      touchReleaseOnEdges={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        //  480px (larger phones)
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // 768px (tablets)
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        //  1024px (desktops)
        1024: {
          slidesPerView: 4,
          spaceBetween: 20
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
                    <div style={{ display: "flex" }}>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <FaStar
                            key={index}
                            style={{ color: "#f6526d", fontSize: "18px" }}
                          />
                        ))}
                    </div>
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
                variant="none"
                className="shopping-basket"
                title="Add to Basket"
                onClick={() => dispatch(addProduct(item))}
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

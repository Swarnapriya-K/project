import { Card, Col, Row, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./HorizontalScroll.css";
import { FaShoppingBasket, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/basketSlice";
import Modal from "react-bootstrap/Modal";
import { BASEURL } from "../../config/config";

function SuccessModal({ onHide, show }) {
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5>Product added successfully to the cart!</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ProductCards = ({ products }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const handleAddBasket = (item) => {
    const productToAdd = {
      productId: {
        _id: item._id,
        image: item.image,
        productName: item.productName,
        productPrice: item.productPrice
      },
      quantity: 1
    };

    // Update Redux store
    dispatch(addProduct(productToAdd));

    // Update localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(
      (p) => p.productId._id === item._id
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setShowSuccessModal(true);
  };

  return (
    <>
      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
      <Swiper
        style={{ paddingBottom: "190px" }}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 }
        }}
        className="product-swiper"
      >
        {products?.map((item) => (
          <SwiperSlide key={item._id}>
            <Card className="card" id="products-page-card">
              <Card.Img
                variant="top"
                src={`${BASEURL}/${item.image}`}
                alt={item.productName}
              />
              <Card.Body>
                <div className="product-rating">
                  <div className="star-rating">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <FaStar
                          key={index}
                          style={{ color: "#f6526d", fontSize: "18px" }}
                        />
                      ))}
                  </div>
                  <span>(1)</span>
                </div>
                <Card.Title>{item.productName}</Card.Title>
                <Row>
                  <Col>
                    <Card.Text className="productrate">
                      ${item.productPrice}
                    </Card.Text>
                  </Col>
                </Row>
                <Button
                  variant="none"
                  className="shopping-basket"
                  title="Add to Basket"
                  onClick={() => handleAddBasket(item)}
                >
                  <FaShoppingBasket />
                </Button>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCards;

import { Card, Col, Row, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./HorizontalScroll.css";
import { FaShoppingBasket } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/basketSlice";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASEURL } from "../../config/config";

function ViewModal({ onHide, show }) {
  const navigate = useNavigate();
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3>Please Login to Continue</h3>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="loginbtn"
        >
          Login
        </button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const ProductCards = ({ products }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const addProductToCart = async (item) => {
    try {
      let response = await axios.post(
        `${BASEURL}/cart/add-products-to-cart`,
        {
          productId: item._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleAddBasket = async (item) => {
    const product = {
      productId: {
        _id: item._id,
        image: item.image,
        productName: item.productName,
        productPrice: item.productPrice
      }
    };
    dispatch(addProduct(product));
  };
  const handleClose = () => setShowLoginModal(false);
  return (
    <>
      <ViewModal show={showLoginModal} onHide={handleClose} />
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
          <SwiperSlide key={item._id}>
            <Card className="card" id="products-page-card">
              <Card.Img variant="top" src={BASEURL + "/" + item.image} />
              {/* {item.discount && (
                <button
                  style={{ color: "white" }}
                  className={`${item.discountstyle}`}
                >
                  {item.discount}
                  <p className="text-discount">Discount</p>
                </button>
              )} */}
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
                <Card.Title>{item.productName}</Card.Title>
                <Row>
                  <Col xl={4}>
                    <Card.Text className="productrate">
                      ${item.productPrice}
                    </Card.Text>
                  </Col>
                  <Col xl={4}>
                    <Card.Text className="discount">
                      {item.productPrice}
                    </Card.Text>
                  </Col>
                </Row>
                {/* Shopping basket button */}
                <Button
                  variant="none"
                  className="shopping-basket"
                  title="Add to Basket"
                  onClick={(e) => handleAddBasket(item)}
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

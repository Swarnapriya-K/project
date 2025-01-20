import React, { useContext, useEffect } from "react";
import "./CartList.css"; // For additional styles
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  addProducts
} from "../../features/basketSlice";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASEURL } from "../../config/config";

const CartList = ({ handleClose }) => {
  const products = useSelector((state) => state.basket.products);
  console.log({ products });
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // Calculate total price
  const total = products.reduce(
    (acc, item) => acc + item.productId.productPrice * item.quantity,
    0
  );

  const removeProductFromCart = async (id) => {
    // let response = await axios.post(
    //   `${BASEURL}/cart/remove-products-from-cart`,
    //   {
    //     productId: id
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // );
    dispatch(removeProduct(id));
    // fetchCartItems();
  };

  const decreaseProductQuantity = async (id) => {
    // let response = await axios.patch(
    //   `${BASEURL}/cart/decrease-product-quantity`,
    //   {
    //     productId: id
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // );
    dispatch(decreaseQuantity(id));
    // fetchCartItems();
  };

  const increaseProductQuantity = async (id) => {
    // let response = await axios.patch(
    //   `${BASEURL}/cart/increase-product-quantity`,
    //   {
    //     productId: id
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // );
    dispatch(increaseQuantity(id));
    // fetchCartItems();
  };

  const fetchCartItems = async () => {
    let response = await axios.get(`${BASEURL}/cart/get-cart-items`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);

    dispatch(addProducts(response.data.products));
  };
  useEffect(() => {
    // fetchCartItems();
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
    handleClose();
  };

  return (
    <div className="cart-container">
      {true ? (
        <>
          {products.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={BASEURL + "/" + item.productId.image}
                alt={item.productId.productName}
                className="item-image"
              />
              <div className="item-details">
                <h4>{item.productId.productName}</h4>
                <p className="item-price">
                  ${item?.productId.productPrice?.toFixed(2)}
                </p>
                <p>
                  {item.quantity} × ${item?.productId.productPrice?.toFixed(2)}
                </p>
              </div>
              <div className="item-controls">
                <button
                  onClick={() => decreaseProductQuantity(item.productId._id)}
                  className="quantity-btn"
                >
                  -
                </button>
                <button
                  onClick={() => increaseProductQuantity(item.productId._id)}
                  className="quantity-btn"
                >
                  +
                </button>
                <button
                  onClick={() => removeProductFromCart(item.productId._id)}
                  className="remove-btn"
                >
                  x
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h4>Total:</h4>
            <h4>${total?.toFixed(2)}</h4>
          </div>
          <button className="checkout-btn" onClick={() => handleCheckout()}>
            Checkout
          </button>
        </>
      ) : (
        <>
          <h2>Please Login to Check Your Cart</h2>
          <button onClick={() => navigate("/login")} className="loginbtn">
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default CartList;

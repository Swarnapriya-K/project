import React, { useState } from "react";
import "./CartList.css"; // For additional styles
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct
} from "../../features/basketSlice";
import { Link } from "react-router";

const CartList = () => {
  const products = useSelector((state) => state.basket.products);
  const dispatch = useDispatch();

  // Increment item quantity
  const increment = (id) => {
    dispatch(increaseQuantity(id));
  };

  // Decrement item quantity
  const decrement = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Remove item from cart
  const removeItem = (id) => {
    dispatch(removeProduct(id));
  };

  // Calculate total price
  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      {products.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.picture}
            alt={item.productname}
            className="item-image"
          />
          <div className="item-details">
            <h4>{item.productname}</h4>
            <p className="item-price">${item.price.toFixed(2)}</p>
            <p>
              {item.quantity} × ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="item-controls">
            <button onClick={() => decrement(item.id)} className="quantity-btn">
              -
            </button>
            <button onClick={() => increment(item.id)} className="quantity-btn">
              +
            </button>
            <button onClick={() => removeItem(item.id)} className="remove-btn">
              x
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h4>Total:</h4>
        <h4>${total.toFixed(2)}</h4>
      </div>
      <Link
        to={"/checkout"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button className="checkout-btn">Cart & Checkout</button>
      </Link>
    </div>
  );
};

export default CartList;

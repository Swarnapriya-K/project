import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./CheckoutComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { BASEURL } from "../../config/config";
import { clearCart } from "../../features/basketSlice";

const SuccessMessage = ({ message }) => {
  return (
    <div
      style={{
        marginInline: "auto"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f6ffed",
          border: "1px solid #b7eb8f",
          padding: "15px",
          borderRadius: "4px",
          color: "#52c41a"
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "10px"
          }}
        >
          ✅
        </div>
        <div style={{ fontSize: "16px" }}>
          {message || "Your order has been placed successfully!"}
        </div>
      </div>
    </div>
  );
};

const CheckoutComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "Tamil Nadu",
    zipCode: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.basket.products);
  const total = products.reduce(
    (acc, item) => acc + item.productId.productPrice * item.quantity,
    0
  );

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    console.log("[1] Place order button clicked");

    const validationErrors = validateForm();
    console.log("[2] Validation errors:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("[3] Validation failed, not submitting");
      setErrors(validationErrors);
      return;
    }

    console.log("[4] Starting order submission");
    setLoading(true);

    try {
      console.log("[5] Creating order payload");
      const orderDetails = {
        ...formData,
        orderItems: products
      };
      console.log("[6] Order payload:", JSON.stringify(orderDetails, null, 2));

      const token = localStorage.getItem("token");
      console.log("[7] Auth token:", token ? "Exists" : "Missing");

      console.log("[8] Sending request to:", `${BASEURL}/add-orders`);
      const response = await axios.post(`${BASEURL}/orders`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("[9] Server response:", response);
      if (response.data.success) {
        console.log("[10] Order success, response data:", response.data);
        setMessage(
          `Order placed successfully with order ID ${response.data.order._id}`
        );
        setOrderPlaced(true);
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("[11] Order error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      console.log("error occurs");
      setMessage(
        "Error occured while placing the order. Please try after sometime"
      );
    } finally {
      console.log("[12] Final cleanup");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <Container>
      <div className="checkout-container">
        {orderPlaced ? (
          <SuccessMessage message={message} />
        ) : (
          <>
            <div className="billing-details">
              <h3>Billing details</h3>
              <form onSubmit={handlePlaceOrder}>
                <div className="form-group">
                  <label>First name *</label>
                  <input type="text" name="firstName" onChange={handleChange} />
                  {errors.firstName && (
                    <span style={{ color: "red" }}>{errors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Last name *</label>
                  <input type="text" name="lastName" onChange={handleChange} />
                  {errors.lastName && (
                    <span style={{ color: "red" }}>{errors.lastName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Company name (optional)</label>
                  <input
                    type="text"
                    name="companyName"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Country / Region *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="United States (US)">
                      United States (US)
                    </option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Street address *</label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="House number and street name"
                    onChange={handleChange}
                  />
                  {errors.streetAddress && (
                    <span style={{ color: "red" }}>{errors.streetAddress}</span>
                  )}
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Town / City *</label>
                  <input type="text" name="city" onChange={handleChange} />
                  {errors.city && (
                    <span style={{ color: "red" }}>{errors.city}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                    <option value="New York">New York</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input type="text" name="zipCode" onChange={handleChange} />
                  {errors.zipCode && (
                    <span style={{ color: "red" }}>{errors.zipCode}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="text" name="phone" onChange={handleChange} />
                  {errors.phone && (
                    <span style={{ color: "red" }}>{errors.phone}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Email address *</label>
                  <input type="email" name="email" onChange={handleChange} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Order notes (optional)</label>
                  <textarea
                    name="notes"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="place-order-btn"
                  type="submit"
                  disabled={loading || orderPlaced}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <h3>Your order</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId._id}>
                      <td>{product.productId.productName}</td>
                      <td>{product.quantity}</td>
                      <td>₹{product.productId.productPrice}</td>
                      <td>
                        ₹
                        {(
                          product.quantity * product.productId.productPrice
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "left",
                        color: "#e91e63",
                        fontWeight: "bold"
                      }}
                    >
                      ₹{total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default CheckoutComponent;

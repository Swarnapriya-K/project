import React, { useState } from "react";
import "./CheckoutComponent.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

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
    country: "United States (US)",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "California",
    zipCode: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number

    // Check required fields
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
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  };

  const products = useSelector((state) => state.basket.products);
  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const orderDetails = {
        customerDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        billingAddress: {
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        shipping: 0.0,
        totalAmount: 61.0,
        currency: "INR",
        itemDetails: products.map((product) => {
          return {
            productId: product.id,
            productName: product.productname,
            quantity: product.quantity,
            unitPrice: product.price
          };
        }),
        notes: formData.notes,
        paymentDetails: {
          method: "Credit Card",
          transactionId: "TXN789123456",
          status: "Pending"
        }
      };

      try {
        const response = await fetch("http://localhost:8080/placeOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderDetails)
        });
        const responseJson = await response.json();
        setMessage(responseJson);
        setOrderPlaced(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <div className="checkout-container">
        {orderPlaced ? (
          <SuccessMessage message={message} />
        ) : (
          <>
            <div className="billing-details">
              <h3>Billing details</h3>
              <form>
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
                    <option>United States (US)</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
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
                    <option>California</option>
                    <option>Texas</option>
                    <option>New York</option>
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
              </form>
            </div>
            <div className="order-summary">
              <h3>Your order</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.productname}</td>
                        <td>{product.price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td style={{ color: "#e91e63", fontWeight: "bold" }}>
                      ${total}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={false}
              >
                Place order
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default CheckoutComponent;

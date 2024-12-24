// Card.jsx
import React from "react";

const OrderDetailsCard = ({ title, count, icon, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center"
      }}
    >
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default OrderDetailsCard;

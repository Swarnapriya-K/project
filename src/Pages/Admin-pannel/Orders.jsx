import React from "react";
import { Container, Row ,Col} from "react-bootstrap";
import { Link } from "react-router";
import OrderDetailsCard from "./OrderDetailsCard";
import OrdersList from "./OrdersList";

const orderData = {
  summary: {
    totalOrders: 21,
    orderDelivered: 15,
    returnOrders: 0,
    ordersInTransit: 12
  },
  orders: [
    {
      id: "#0076",
      date: "Jan 14th, 2024",
      customer: "Gabby Whitaker",
      payment: "Paid",
      total: "$1200",
      delivery: "N/A",
      items: 5,
      status: "Confirmed"
    },
    {
      id: "#0075",
      date: "Jan 14th, 2024",
      customer: "Jenny Howard",
      payment: "Paid",
      total: "$2500",
      delivery: "N/A",
      items: 7,
      status: "Processing"
    },
    {
      id: "#0074",
      date: "Jan 14th, 2024",
      customer: "Willie Horton",
      payment: "Refunded",
      total: "$500",
      delivery: "N/A",
      items: 3,
      status: "Cancelled"
    },
    {
      id: "#0073",
      date: "Jan 14th, 2024",
      customer: "Jackie Simons",
      payment: "Pending",
      total: "$900",
      delivery: "N/A",
      items: 4,
      status: "Processing"
    },
    {
      id: "#0072",
      date: "Jan 14th, 2024",
      customer: "Andre Jones",
      payment: "Paid",
      total: "$2300",
      delivery: "N/A",
      items: 6,
      status: "Delivered"
    },
    {
      id: "#0071",
      date: "Jan 14th, 2024",
      customer: "Eleanor Perez",
      payment: "Paid",
      total: "$3000",
      delivery: "N/A",
      items: 8,
      status: "Delivered"
    },
    {
      id: "#0070",
      date: "Jan 14th, 2024",
      customer: "David White",
      payment: "Refunded",
      total: "$1100",
      delivery: "N/A",
      items: 4,
      status: "Cancelled"
    },
    {
      id: "#0069",
      date: "Jan 14th, 2024",
      customer: "Wendy Thomas",
      payment: "Pending",
      total: "$800",
      delivery: "N/A",
      items: 3,
      status: "Processing"
    }
  ]
};

const cardDetails = [
  { title: "Total Orders", key: "totalOrders", color: "#007bff", icon: "📦" },
  {
    title: "Delivered Orders",
    key: "orderDelivered",
    color: "#28a745",
    icon: "✅"
  },
  {
    title: "In Transit Orders",
    key: "ordersInTransit",
    color: "#ffc107",
    icon: "🚚"
  },
  { title: "Return Orders", key: "returnOrders", color: "#dc3545", icon: "↩️" }
];
const Orders = () => {
  return (
    <>
      <div>
        <Container fluid className="Service-Container">
          <Row className="Service-Row-Style">
            <Col xl={3} className="col-xl-3-colm">
              <h1 style={{ fontWeight: "300" }}>Orders</h1>{" "}
              {/* Corrected 'fontweight' to 'fontWeight' */}
            </Col>
            <Col xl={5}>
              <ul>
                <Link className="Admin-sidebar">
                  <li>Home</li>
                  <li style={{ color: "#4291e7" }}>Orders</li>{" "}
                  {/* Corrected 'Catagories' to 'Categories' */}
                </Link>
              </ul>
            </Col>
          </Row>
          <div style={{ padding: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px"
              }}
            >
              {cardDetails.map((detail) => (
                <OrderDetailsCard
                  key={detail.key}
                  title={detail.title}
                  count={orderData.summary[detail.key]}
                  color={detail.color}
                  icon={detail.icon}
                />
              ))}
            </div>
            <div>
              <OrdersList orders={orderData.orders} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Orders;

import React from "react";
import { Table,Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const OrderRow = ({ order }) => {
  const { id, date, customer, payment, total, delivery, items, status } = order;
  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{customer}</td>
      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor: payment === "Paid" ? "#28a745" : "#ffc107"
          }}
        >
          {payment}
        </span>
      </td>
      <td>{total}</td>
      <td>{delivery}</td>
      <td>{items}</td>
      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor:
              status === "Confirmed"
                ? "#28a745"
                : status === "Processing"
                ? "#ffc107"
                : status === "Delivered"
                ? "#007bff"
                : "#dc3545"
          }}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

const OrdersList = ({ orders }) => {
  console.log(orders);
  return (
  
    <>
      <div className="service-list-Container">
        <Row className="Service-inner-row">
          <Col xl={1} className="servicelist-icon">
            <FontAwesomeIcon icon={faList} />
          </Col>
          <Col>Order List</Col>
        </Row>
        <div className="Service-innerList">
          <Row className="Service-list-items">
            <Table bordered hover>
              <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th> Customer</th>
            <th>Payment </th>
            <th>Total </th>
            <th>Delivery </th>
            <th>No.Of Items</th>
            <th>Status </th>
          </tr>
        </thead>
              <tbody>
                {orders.map((order, index) => {
                  return <OrderRow order={order} />;
                })}
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
    </>
  );
};

export default OrdersList;

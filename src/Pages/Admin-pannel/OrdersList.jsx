import{ React,useState} from "react";
import { Table,Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const OrderRow = ({ order,index }) => {
  const { OrderID, Date, Customer, Payment, Total, Status } = order;
  return (
    <tr>
      <td>{index+1}</td>
      <td>{OrderID}</td>
      <td>{Date}</td>
      <td>{Customer}</td>
      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor: Payment === "Paid" ? "#28a745" : "#ffc107"
          }}
        >
          {Payment}
        </span>
      </td>
      <td>{Total}</td>
      <td>{order["No.Of.Items"]}</td>
      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor:
              Status === "Confirmed"
                ? "#28a745"
                : Status === "Processing"
                ? "#ffc107"
                : Status === "Delivered"
                ? "#007bff"
                : "#dc3545"
          }}
        >
          {Status}
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
           <Row className="table-border-outline">
            <Table bordered hover responsive="sm" className="custom-table">
              <thead>
          <tr>
            <th>SNO</th>
            <th>Order ID</th>
            <th>Date</th>
            <th> Customer</th>
            <th>Payment </th>
            <th>Total </th>
    
            <th>No.Of Items</th>
            <th>Status </th>
          </tr>
        </thead>
              <tbody>
                {orders.map((order, index) => {
                  return <OrderRow order={order} index={index}/>;
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

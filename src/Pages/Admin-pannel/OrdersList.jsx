import React, { useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

const OrderRow = ({ order, index, isSelected, handleRowSelect, sno }) => {
  const { OrderID, Date, Customer, Payment, Total, Status } = order;

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleRowSelect(OrderID)}
        />
      </td>
      <td>{sno}</td>
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

const OrdersList = ({
  orders,
  selectedOrders,
  allSelected,
  setAllSelected,
  setSelectedOrders
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  // Handle page click (pagination)
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // ReactPaginate uses zero-based index
  };

  // Reverse the products array for display but maintain the original order for serial number calculation

  // Pagination logic
  const totalOrders = orders.length;
  const offset = currentPage * itemsPerPage;
  const currentOrders = orders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(totalOrders / itemsPerPage);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(orders.map((order) => order.OrderID)); // Select all
    }
    setAllSelected(!allSelected);
  };

  const handleRowSelect = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id)); // Deselect
    } else {
      setSelectedOrders([...selectedOrders, id]); // Select
    }
  };

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
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedOrders.length === orders.length &&
                        orders.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>SNO</th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>No. Of Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  <>
                    {currentOrders.map((order, index) => (
                      <OrderRow
                        key={index}
                        order={order}
                        index={index}
                        isSelected={selectedOrders.includes(order.OrderID)}
                        handleRowSelect={handleRowSelect}
                        sno={totalOrders - (offset + index)}
                      />
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
          <Pagination
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default OrdersList;

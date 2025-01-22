import React, { useEffect, useState } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faPlus,
  faFileCsv,
  faFileExcel,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import OrdersList from "./OrdersList";
import { BASEURL } from "../../config/config";
import axios from "axios";
const downloadCsv = async () => {
  try {
    const response = await axios.get(`${BASEURL}/orders/export-order-csv`);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading CSV:", error);
  }
};

const downloadPdf = async () => {
  try {
    const response = await axios.get(`${BASEURL}/orders/export-order-pdf`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading PDF:", error);
  }
};

const downloadExcel = async () => {
  try {
    const response = await axios.get(`${BASEURL}/orders/export-order-excel`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading Excel:", error);
  }
};

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const token = localStorage.getItem("token");

  const deleteMultipleOrders = async (orderIds) => {
    if (orderIds.length === 0) {
      // If no products are selected, show an alert or message
      alert("Please select products to delete");
      return; // Exit the function early
    }

    // Ask for confirmation before proceeding with deletion
    const confirmation = window.confirm(
      `Are you sure you want to delete ${orderIds.length} orders?`
    );

    if (confirmation) {
      try {
        const response = await axios.delete(`${BASEURL}/orders/delete-orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { ids: orderIds }
        });
        console.log(response);
        fetchOrders(); // Fetch the updated product list after deletion
      } catch (error) {
        console.error(
          "Error deleting products:",
          error.response?.data?.message || error.message
        );
      }
    } else {
      console.log("Deletion cancelled");
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASEURL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrdersList(response.data.orders);
      console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <div>
        <Container fluid className="Service-Container">
          <Row className="Service-Row-Style">
            <Col xl={3} className="col-xl-3-colm">
              <h1 style={{ fontWeight: "300" }}>Orders</h1>
            </Col>

            <Col xl={10} className="icons-colmn">
              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="pdf-tooltip">Download PDF</Tooltip>}
                >
                  <button className="add-btn" onClick={downloadPdf}>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </button>
                </OverlayTrigger>
              </Link>

              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="csv-tooltip">Download CSV</Tooltip>}
                >
                  <button className="add-btn" onClick={downloadCsv}>
                    <FontAwesomeIcon icon={faFileCsv} />
                  </button>
                </OverlayTrigger>
              </Link>

              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="excel-tooltip">Download Excel</Tooltip>}
                >
                  <button className="add-btn" onClick={downloadExcel}>
                    <FontAwesomeIcon icon={faFileExcel} />
                  </button>
                </OverlayTrigger>
              </Link>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete All</Tooltip>}
              >
                <Link>
                  <button
                    className="del-btn"
                    onClick={(e) => deleteMultipleOrders(selectedOrders)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="addicon" />
                  </button>
                </Link>
              </OverlayTrigger>
            </Col>
          </Row>
          <div style={{ padding: "16px" }}>
            <div>
              <OrdersList
                orders={ordersList}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                allSelected={allSelected}
                setAllSelected={setAllSelected}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Orders;

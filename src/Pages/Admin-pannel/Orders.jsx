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
import OrderDetailsCard from "./OrderDetailsCard";
import OrdersList from "./OrdersList";
import { BASEURL } from "../../config/config";
import axios from "axios";

// const orderData = {
//   summary: {
//     totalOrders: 21,
//     orderDelivered: 15,
//     returnOrders: 0,
//     ordersInTransit: 12
//   },
//   orders: [
//     {
//       id: "#0076",
//       date: "Jan 14th, 2024",
//       customer: "Gabby Whitaker",
//       payment: "Paid",
//       total: "$1200",
//       delivery: "N/A",
//       items: 5,
//       status: "Confirmed"
//     },
//     {
//       id: "#0075",
//       date: "Jan 14th, 2024",
//       customer: "Jenny Howard",
//       payment: "Paid",
//       total: "$2500",
//       delivery: "N/A",
//       items: 7,
//       status: "Processing"
//     },
//     {
//       id: "#0074",
//       date: "Jan 14th, 2024",
//       customer: "Willie Horton",
//       payment: "Refunded",
//       total: "$500",
//       delivery: "N/A",
//       items: 3,
//       status: "Cancelled"
//     },
//     {
//       id: "#0073",
//       date: "Jan 14th, 2024",
//       customer: "Jackie Simons",
//       payment: "Pending",
//       total: "$900",
//       delivery: "N/A",
//       items: 4,
//       status: "Processing"
//     },
//     {
//       id: "#0072",
//       date: "Jan 14th, 2024",
//       customer: "Andre Jones",
//       payment: "Paid",
//       total: "$2300",
//       delivery: "N/A",
//       items: 6,
//       status: "Delivered"
//     },
//     {
//       id: "#0071",
//       date: "Jan 14th, 2024",
//       customer: "Eleanor Perez",
//       payment: "Paid",
//       total: "$3000",
//       delivery: "N/A",
//       items: 8,
//       status: "Delivered"
//     },
//     {
//       id: "#0070",
//       date: "Jan 14th, 2024",
//       customer: "David White",
//       payment: "Refunded",
//       total: "$1100",
//       delivery: "N/A",
//       items: 4,
//       status: "Cancelled"
//     },
//     {
//       id: "#0069",
//       date: "Jan 14th, 2024",
//       customer: "Wendy Thomas",
//       payment: "Pending",
//       total: "$800",
//       delivery: "N/A",
//       items: 3,
//       status: "Processing"
//     }
//   ]
// };
const downloadCsv = async () => {
  try {
    const response = await axios.get(
      `${BASEURL}/orders/export-order-csv`
      //  {
      //    responseType: "blob"
      //  }
    );
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASEURL}/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrdersList(response.data.orders);
        console.log(response.data.orders)
      } catch (error) {
        console.log(error);
      }
    };
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
            </Col>
          </Row>
          <div style={{ padding: "16px" }}>
            <div>
              <OrdersList orders={ordersList} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Orders;

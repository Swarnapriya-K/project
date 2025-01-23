import { React, useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faPlus,
  faFileCsv,
  faFileExcel,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import ProductList from "./ProductList";
import axios from "axios";
import { BASEURL } from "../../config/config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/products/get-products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // This function adds the new product at the top of the list
  const addProductToTop = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]); // Add the new product to the top
  };

  const downloadCsv = async () => {
    try {
      axios
        .get(`${BASEURL}/products/export-product-csv`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "products.csv";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadPdf = () => {
    try {
      axios
        .get(`${BASEURL}/products/export-product-pdf`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "products.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadExcel = () => {
    try {
      axios
        .get(`${BASEURL}/products/export-product-excel`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "products.xlsx";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const deleteMultipleProducts = async (productIds) => {
  if (productIds.length === 0) {
    // If no products are selected, show an alert or message
    alert("Please select products to delete");
    return; // Exit the function early
  }

  // Ask for confirmation before proceeding with deletion
  const confirmation = window.confirm(
    `Are you sure you want to delete ${productIds.length} products?`
  );

  if (confirmation) {
    try {
      const response = await axios.delete(
        `${BASEURL}/products/delete-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { ids: productIds }
        }
      );
      console.log(response);
      fetchProducts(); // Fetch the updated product list after deletion
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



  return (
    <div>
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Products</h1>
          </Col>

          <Col className="icons-colmn">
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
              overlay={<Tooltip>Add New</Tooltip>}
            >
              <Link to="/admin/product/add-product" className="add-btn">
                <FontAwesomeIcon icon={faPlus} className="addicon" />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Delete All</Tooltip>}
            >
              <Link>
                <button
                  className="del-btn"
                  onClick={(e) => deleteMultipleProducts(selectedProducts)}
                >
                  <FontAwesomeIcon icon={faTrash} className="addicon" />
                </button>
              </Link>
            </OverlayTrigger>
          </Col>
        </Row>

        <hr className="hr-line-design2" />
        <Row>
          <ProductList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            products={products}
            allSelected={allSelected}
            setAllSelected={setAllSelected}
            deleteMultipleProducts={deleteMultipleProducts}
            addProductToTop={addProductToTop} 
          />
        </Row>
      </Container>
    </div>
  );
};

export default Products;

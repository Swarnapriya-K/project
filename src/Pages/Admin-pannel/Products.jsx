import React, { useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom"; // Correct import for react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductsList from "./ProductsList";
import axios from "axios";
import { BASEURL } from "../../config/config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/products/get-products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  
  const deleteMultipleProducts = async (productIds) => {
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
      fetchProducts();
    } catch (error) {
      console.error(
        "Error deleting products:",
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <>
      <div>
        <Container fluid className="Service-Container">
          <Row className="Service-Row-Style">
            <Col xl={3} className="col-xl-3-colm">
              <h1 style={{ fontWeight: "300" }}>Products</h1>{" "}
              {/* Corrected 'fontweight' to 'fontWeight' */}
            </Col>
            <Col xl={5}>
              <ul>
                <Link className="Admin-sidebar">
                  <li>Home</li>
                  <li style={{ color: "#4291e7" }}>Products</li>{" "}
                  {/* Corrected 'Catagories' to 'Categories' */}
                </Link>
              </ul>
            </Col>
            <Col className="icons-colmn">
              <OverlayTrigger
                placement="top" // Tooltip will appear on top of the button
                overlay={<Tooltip>Add New</Tooltip>}
              >
                <Link
                  to={"/admin/products/add-product"}
                  className="add-btn"
                  // state={{ name: "dharanidharan" }}
                >
                  <FontAwesomeIcon icon={faPlus} className="addicon" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top" // Tooltip will appear on top of the button
                overlay={<Tooltip>Copy</Tooltip>}
              >
                <button className="ref-btn">
                  <FontAwesomeIcon icon={faCopy} className="reficon" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top" // Tooltip will appear on top of the button
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <button
                  className="del-btn"
                  onClick={() => deleteMultipleProducts(selectedProducts)}
                >
                  <FontAwesomeIcon icon={faTrash} className="delicon" />
                </button>
              </OverlayTrigger>
            </Col>
          </Row>

          <hr className="hr-line-design2" />
          <Row>
            <ProductsList
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              products={products}
            />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;

import { React, useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
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
         "Error deleting services:",
         error.response?.data?.message || error.message
       );
     }
   };

  return (
    <div>
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Products</h1>
          </Col>
          <Col xl={5}>
            <ul>
              <Link className="Admin-sidebar">
                <li>Home</li>
                <li style={{ color: "#4291e7" }}>Products</li>
              </Link>
            </ul>
          </Col>
          <Col className="icons-colmn">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Add New</Tooltip>}
            >
              <Link to={"/admin/product/add-product"} className="add-btn">
                <FontAwesomeIcon icon={faPlus} className="addicon" />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Rebuild</Tooltip>}
            >
              <button className="ref-btn">
                <FontAwesomeIcon icon={faRefresh} className="reficon" />
              </button>
            </OverlayTrigger>
            {/* <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <button
                className="del-btn"
                onClick={() => deleteMultipleProducts(selectedProducts)}
              >
                <FontAwesomeIcon icon={faTrash} className="delicon" />
              </button>
            </OverlayTrigger> */}
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
          />
        </Row>
      </Container>
    </div>
  );
};

export default Products;

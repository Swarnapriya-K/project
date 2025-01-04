import React, { useEffect, useState } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faList,
  faPencil,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { BASEURL } from "../../config/config";
import ViewModal from "./Modal";

const ProductList = ({
  products,
  setSelectedProducts,
  selectedProducts,
  allSelected,
  setAllSelected,
  deleteMultipleProducts
}) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedProduct, setClickedProduct] = useState({});
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedProducts([]); // Deselect all
    } else {
      setSelectedProducts(products.map((product) => product._id)); // Select all
    }
    setAllSelected(!allSelected);
  };

  const handleRowSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      ); // Deselect
    } else {
      setSelectedProducts([...selectedProducts, id]); // Select
    }
  };

  useEffect(() => {
    setAllSelected(
      selectedProducts.length === products.length && products.length > 0
    );
  }, [selectedProducts, products]);

  const onModalClose = () => setShowModal(false);
  console.log(clickedProduct);

  return (
    <div className="service-list-Container">
      <ViewModal
        show={showModal}
        onHide={onModalClose}
        heading={clickedProduct.productName}
      >
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Product Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <img
                  src={BASEURL + "/" + clickedProduct.image}
                  alt={clickedProduct.productName}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover"
                  }}
                />
              </td>
              <td>{clickedProduct?.productName}</td>
              <td>{clickedProduct?.categoryId?.name}</td>
              <td>{clickedProduct?.productPrice}</td>
              <td>{clickedProduct?.discount}</td>
            </tr>
          </tbody>
        </Table>
      </ViewModal>
      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Product List</Col>
      </Row>
      <Row className="table-border-outline">
        <Table bordered hover className="table-borderline">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>SNO.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              [...products].reverse().map(
                (
                  product,
                  index // Reverse the products array
                ) => (
                  <tr key={product._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleRowSelect(product._id)}
                      />
                    </td>
                    <td>{products.length - index}</td> {/* Reverse SNO logic */}
                    <td>
                      {product.image ? (
                        <img
                          src={BASEURL + "/" + product.image}
                          alt={product.productName}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover"
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{product?.productName}</td>
                    <td>{product?.categoryId?.name}</td>
                    <td>{product?.productPrice}</td>
                    <td>{product?.discount}</td>
                    <td>
                      <Link
                        to={"/admin/product/add-product"}
                        className="add-btn"
                        state={{
                          ...product,
                          categoryId: product?.categoryId?._id
                        }}
                      >
                        <button className="edit-btn">
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                      </Link>
                      <Link>
                        <button
                          className="del-btn"
                          onClick={() =>
                            deleteMultipleProducts(selectedProducts)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} className="delicon" />
                        </button>
                      </Link>
                      <Link
                        className="add-btn"
                        onClick={() => {
                          setClickedProduct(product);
                          setShowModal(true);
                        }}
                      >
                        <button className="edit-btn">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default ProductList;

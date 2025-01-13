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
import Pagination from "./Pagination"; // Import Pagination component

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  // Calculate total pages based on number of products and items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

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

  // Reverse the products array for display but maintain the original order for serial number calculation
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when the items per page change
  };

  // Handle page click (pagination)
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // ReactPaginate uses zero-based index
  };

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
        <Table bordered hover responsive="sm" className="custom-table">
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
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleRowSelect(product._id)}
                    />
                  </td>
                  <td>
                    {products.length - index - (currentPage - 1) * itemsPerPage}
                  </td>{" "}
                  {/* Correct SNO for reverse order */}
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
                        onClick={() => deleteMultipleProducts([product._id])}
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
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>

      {/* Pagination component */}
      <Pagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        pageCount={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default ProductList;

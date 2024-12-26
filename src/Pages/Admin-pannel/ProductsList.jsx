import React, { useState } from "react";
import { Col, Row, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
const ProductRow = ({ product, isChecked, onCheckboxChange }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(product._id)}
        />
      </td>
      <td>
        <img
          src={`http://localhost:8080/${product.image}`}
          alt=""
          style={{ width: "40px" }}
        />
      </td>
      <td>{product.productName}</td>
      <td>{product.productPrice}</td>
      <td>{product.discount}</td>
      <td>{product.productQuantity}</td>
      <td style={{ textAlign: "end" }}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top-${product._id}`}>Edit</Tooltip>}
        >
          <Link
            to={"/admin/products/add-product"}
            className="add-btn"
            state={product}
          >
            <button className="edit-btn">
              <FontAwesomeIcon icon={faPencil} />
            </button>
          </Link>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

const ProductsList = ({ setSelectedProducts, selectedProducts, products }) => {
  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);

    if (isChecked) {
      setSelectedProducts(products.map((product) => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(id);
      const updatedSelectedProducts = isAlreadySelected
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];

      setAllSelected(updatedSelectedProducts.length === products.length);

      return updatedSelectedProducts;
    });
  };

  return (
    <div className="service-list-Container">
      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Product List</Col>
      </Row>
      <div className="Service-innerList">
        <Row className="Service-list-items">
          <Table bordered hover>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Image</th>
                <th>Products Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  isChecked={selectedProducts.includes(product._id)}
                  onCheckboxChange={handleRowCheckboxChange}
                />
              ))}
            </tbody>
          </Table>
        </Row>
      </div>
    </div>
  );
};

export default ProductsList;

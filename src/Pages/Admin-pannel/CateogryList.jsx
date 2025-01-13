import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faList,
  faPencil,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import ViewModal from "./Modal";
import Pagination from "./Pagination";

const CategoryRow = ({
  category,
  sno,
  isChecked,
  onCheckboxChange,
  deleteMultipleCategories,
  selectedCategories,
  setClickedCategory,
  setShowModal
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(category._id)}
        />
      </td>
      <td>{sno}</td>
      <td>{category.name}</td>
      <td>
        <Link
          to={"/admin/category/add-category"}
          className="add-btn"
          state={category}
        >
          <button className="edit-btn">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </Link>
        <Link>
          <button
            className="del-btn"
            onClick={() => {
              if (selectedCategories.length > 0)
                deleteMultipleCategories(selectedCategories);
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="delicon" />
          </button>
        </Link>
        <Link className="add-btn">
          <button
            className="edit-btn"
            onClick={() => {
              setClickedCategory(category);
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Link>
      </td>
    </tr>
  );
};

const CategoryList = ({
  categories,
  setSelectedCategories,
  selectedCategories,
  allSelected,
  setAllSelected,
  deleteMultipleCategories
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination logic
  const totalCategories = categories.length;
  const offset = currentPage * itemsPerPage;
  const currentCategories = categories.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(totalCategories / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);

    if (isChecked) {
      setSelectedCategories(categories.map((category) => category._id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((categoryId) => categoryId !== id)
      ); // Deselect
    } else {
      setSelectedCategories([...selectedCategories, id]); // Select
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value); // Dynamically change items per page
    setItemsPerPage(newItemsPerPage); // Set new items per page
    setCurrentPage(0); // Reset to first page when items per page changes
  };

  const [showModal, setShowModal] = useState(false);
  const [clickedCategory, setClickedCategory] = useState({});
  const onModalClose = () => setShowModal(false);

  return (
    <div className="service-list-Container">
      <ViewModal
        show={showModal}
        onHide={onModalClose}
        heading={"Category Name"}
      >
        <div className="modal-content">
          <h5 className="modal-title mx-3">{clickedCategory?.name}</h5>
          <div className="modal-body"></div>
        </div>
      </ViewModal>

      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Category List</Col>
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
              <th>SNo</th>
              <th>Main Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <CategoryRow
                  key={category._id}
                  category={category}
                  sno={totalCategories - (offset + index)} // Corrected SNo logic
                  isChecked={selectedCategories.includes(category._id)}
                  onCheckboxChange={handleRowCheckboxChange}
                  deleteMultipleCategories={deleteMultipleCategories}
                  selectedCategories={selectedCategories}
                  setClickedCategory={setClickedCategory}
                  setShowModal={setShowModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No categories found.
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
  );
};

export default CategoryList;

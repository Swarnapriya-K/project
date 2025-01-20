import React, { useState, useEffect } from "react";
import {Col, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash,faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ViewModal from "./Modal";
import Pagination from "./Pagination";

const CategoryRow = ({
  category,
  sno,
  isChecked,
  onCheckboxChange,
  updateCategoryStatus,
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
        <button
          className="del-btn"
          onClick={() => updateCategoryStatus([category._id])}
        >
          <FontAwesomeIcon icon={faTrash} className="delicon" />
        </button>
      </td>
    </tr>
  );
};

const CategoryList = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  updateCategoryStatus,
  allSelected,
  setAllSelected
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
      // Select all categories
      setSelectedCategories(categories.map((category) => category._id));
    } else {
      // Deselect all categories
      setSelectedCategories([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((categoryId) => categoryId !== id)
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  const [showModal, setShowModal] = useState(false);
  const [clickedCategory, setClickedCategory] = useState({});
  const onModalClose = () => setShowModal(false);

  useEffect(() => {
    // Update the header checkbox state based on selected categories
    setAllSelected(
      selectedCategories.length > 0 &&
        selectedCategories.length === categories.length
    );
  }, [selectedCategories, categories, setAllSelected]);

  return (
    <div className="Category-list-Container">
      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Category List</Col>
      </Row>
      <ViewModal
        show={showModal}
        onHide={onModalClose}
        heading={"Category Details"}
      >
        <div className="modal-content">
          <h5 className="modal-title mx-3">{clickedCategory?.name}</h5>
        </div>
      </ViewModal>

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
              <th className="Action-width-style">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <CategoryRow
                  key={category._id}
                  category={category}
                  sno={totalCategories - (offset + index)}
                  isChecked={selectedCategories.includes(category._id)}
                  onCheckboxChange={handleRowCheckboxChange}
                  updateCategoryStatus={updateCategoryStatus}
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

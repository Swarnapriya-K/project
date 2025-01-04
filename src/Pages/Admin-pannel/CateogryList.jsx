import { React, useState } from "react";
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
const CategoryRow = ({
  category,
  isChecked,
  onCheckboxChange,
  deleteMultipleCategories,
  setSelectedCategories,
  selectedCategories,
  setClickedCategory,
  setShowModal,
  showModal
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
        <Link
          className="add-btn"
          onClick={() => {
            setClickedCategory(category);
            setShowModal(true);
          }}
        >
          <button className="edit-btn">
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
    setSelectedCategories((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(id);
      const updatedSelectedProducts = isAlreadySelected
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id];

      setAllSelected(updatedSelectedProducts.length === categories.length);

      return updatedSelectedProducts;
    });
  };
  const [showModal, setShowModal] = useState(false);
  const [clickedCategory, setClickedCategory] = useState({});
  const onModalClose = () => setShowModal(false);
  console.log(clickedCategory);
  return (
    <div className="service-list-Container">
      <ViewModal
        show={showModal}
        onHide={onModalClose}
        heading={clickedCategory.productName}
      >
        <Table>
          <thead>
            <tr>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{clickedCategory?.name}</td>
            </tr>
          </tbody>
        </Table>
      </ViewModal>
      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Category List</Col>
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
              <th>Main Category</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              <>
                {categories.map((category) => (
                  <CategoryRow
                    key={category._id}
                    category={category}
                    isChecked={selectedCategories.includes(category._id)}
                    onCheckboxChange={handleRowCheckboxChange}
                    deleteMultipleCategories={deleteMultipleCategories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    setClickedCategory={setClickedCategory}
                    setShowModal={setShowModal}
                    showModal={showModal}
                  />
                ))}
              </>
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
    </div>
  );
};

export default CategoryList;

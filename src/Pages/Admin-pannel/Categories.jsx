import React, { useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom"; // Correct import for react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASEURL } from "../../config/config";
import "./Dashboard.css";
import CategoryList from "./CateogryList";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const token = localStorage.getItem("token");
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASEURL}/category/get-category`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteMultipleCategories = async (categoryIds) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/category/delete-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { ids: categoryIds }
        }
      );
      console.log(response);
      setSelectedCategories([]);
      setAllSelected(false);
      fetchCategories();
    } catch (error) {
      console.error(
        "Error deleting categories:",
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
              <h1 style={{ fontWeight: "300" }}>Categories</h1>{" "}
            </Col>
            <Col xl={5}>
              <ul>
                <Link className="Admin-sidebar">
                  <Link to={"/admin/"}>Home</Link>
                  <li style={{ color: "#4291e7" }}>Categories</li>{" "}
                </Link>
              </ul>
            </Col>
            <Col className="icons-colmn">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Add New</Tooltip>}
              >
                <Link
                  to={"/admin/category/add-category"}
                  className="add-btn"
                  // state={{ name: "dharanidharan" }}
                >
                  <FontAwesomeIcon icon={faPlus} className="addicon" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip>Copy</Tooltip>}>
                <button className="ref-btn">
                  <FontAwesomeIcon icon={faCopy} className="reficon" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <button
                  className="del-btn"
                  onClick={() => {
                    if (selectedCategories.length > 0)
                      deleteMultipleCategories(selectedCategories);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className="delicon" />
                </button>
              </OverlayTrigger>
            </Col>
          </Row>

          <hr className="hr-line-design2" />
          <Row>
            <CategoryList
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              allSelected={allSelected}
              setAllSelected={setAllSelected}
              deleteMultipleCategories={deleteMultipleCategories}
            />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Category;

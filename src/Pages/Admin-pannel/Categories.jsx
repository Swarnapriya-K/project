import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { BASEURL } from "../../config/config";
import "./Dashboard.css";
import CategoryList from "./CateogryList";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle missing token (optional)
        alert("Authorization token is missing.");
        return;
      }

      const response = await axios.get(`${BASEURL}/category/get-category`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filter and set only active categories
      const activeCategories = response.data.categories.filter(
        (category) => category.active
      );

      setCategories(activeCategories);

      console.log("Categories fetched successfully:", activeCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);

      // Optional: Display error message to the user
      alert("Failed to fetch categories. Please try again later.");
    }
  };

  const downloadCsv = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/category/export-category-csv`,
        {
          responseType: "blob"
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "categories.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log("Error downloading CSV:", error);
    }
  };

  const downloadPdf = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/category/export-category-pdf`,
        {
          responseType: "blob"
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "categories.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log("Error downloading PDF:", error);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/category/export-category-excel`,
        {
          responseType: "blob"
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "categories.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log("Error downloading Excel:", error);
    }
  };

  const deleteMultipleCategories = async (categoryIds) => {
    if (categoryIds.length === 0) {
      alert("Please select a category to delete.");
      return;
    }

    const confirmDeactivate = window.confirm(
      `Are you sure you want to delete ${categoryIds.length} categories?`
    );

    if (!confirmDeactivate) return;

    try {
      const response = await axios.put(
        `${BASEURL}/category/delete-categories`,
        { ids: categoryIds },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Categories deactivated:", response.data.message);

      // Reset selections and refresh the category list
      setSelectedCategories([]); // Clear selected categories
      setAllSelected(false); // Deselect all categories
      fetchCategories(); // Refresh the category list

      alert(response.data.message); // Display success message
    } catch (error) {
      console.error("Error deactivating categories:", error);

      // Display error message to the user
      alert("Failed to delete categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="admin-container">
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Category</h1>
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
              <Link to="/admin/category/add-category" className="add-btn">
                <FontAwesomeIcon icon={faPlus} className="addicon" />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Delete Categories</Tooltip>}
            >
              <button
                onClick={() => {
                  if (selectedCategories.length === 0) {
                    alert("Please select categories to delete.");
                  } else {
                    deleteMultipleCategories(selectedCategories);
                  }
                }}
                className="del-btn"
                title="Delete Selected Categories"
              >
                <FontAwesomeIcon icon={faTrash} className="addicon" />
              </button>
            </OverlayTrigger>
          </Col>
        </Row>

        <CategoryList
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          updateCategoryStatus={deleteMultipleCategories}
          allSelected={allSelected}
          setAllSelected={setAllSelected}
        />
      </Container>
    </div>
  );
}

export default Category;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom"; // Correct import for react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faPlus, faFileCsv,faFileExcel, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const downloadCsv = async () => {
    try {
      axios
        .get(`${BASEURL}/category/export-category-csv`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "categories.csv";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadPdf = () => {
    try {
      axios
        .get(`${BASEURL}/category/export-category-pdf`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "category.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadExcel = async () => {
    try {
      axios
        .get(`${BASEURL}/category/export-category-excel`, {
          responseType: "blob"
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "categories.xlsx";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
    } catch (error) {
      console.log("error", error);
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

            <Col className="icons-colmn">
              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="pdf-tooltip">Download PDF</Tooltip>}
                >
                  <button className="add-btn" onClick={(e) => downloadPdf()}>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </button>
                </OverlayTrigger>
              </Link>

              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="csv-tooltip">Download CSV</Tooltip>}
                >
                  <button className="add-btn" onClick={(e) => downloadCsv()}>
                    <FontAwesomeIcon icon={faFileCsv} />
                  </button>
                </OverlayTrigger>
              </Link>

              <Link>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="excel-tooltip">Download Excel</Tooltip>}
                >
                  <button className="add-btn" onClick={(e) => downloadExcel()}>
                    <FontAwesomeIcon icon={faFileExcel} />
                  </button>
                </OverlayTrigger>
              </Link>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Add New</Tooltip>}
              >
                <Link to={"/admin/category/add-category"} className="add-btn">
                  <FontAwesomeIcon icon={faPlus} className="addicon" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete All</Tooltip>}
              >
                <Link>
                  <button className="del-btn" onClick={(e)=>deleteMultipleCategories(selectedCategories)}>
                    <FontAwesomeIcon icon={faTrash} className="addicon" />
                  </button>
                </Link>
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

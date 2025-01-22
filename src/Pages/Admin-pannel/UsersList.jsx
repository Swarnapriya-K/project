import { useEffect, useState } from "react";
import {
  Table,
  Container,
  Alert,
  Spinner,
  OverlayTrigger,
  Row,
  Col,
  Tooltip
} from "react-bootstrap";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileCsv,
  faFileExcel,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASEURL } from "../../config/config";
import Pagination from "./Pagination";

const token = localStorage.getItem("token");

const downloadCsv = async () => {
  try {
    const response = await axios.get(
      `${BASEURL}/users/export-users-csv`
      //  {
      //    responseType: "blob"
      //  }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Users.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading CSV:", error);
  }
};

const downloadPdf = async () => {
  try {
    const response = await axios.get(`${BASEURL}/users/export-users-pdf`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Users.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading PDF:", error);
  }
};

const downloadExcel = async () => {
  try {
    const response = await axios.get(`${BASEURL}/users/export-users-excel`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Users.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.log("Error downloading Excel:", error);
  }
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  // Handle page click (pagination)
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // ReactPaginate uses zero-based index
  };

  // Reverse the products array for display but maintain the original order for serial number calculation

  // Pagination logic
  const totalUsers = users.length;
  const offset = currentPage * itemsPerPage;
  const currentUsers = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(totalUsers / itemsPerPage);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASEURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const deleteMultipleUsers = async (userIds) => {
    if (userIds.length === 0) {
      // If no products are selected, show an alert or message
      alert("Please select products to delete");
      return; // Exit the function early
    }

    // Ask for confirmation before proceeding with deletion
    const confirmation = window.confirm(
      `Are you sure you want to delete ${userIds.length} users?`
    );

    if (confirmation) {
      try {
        const response = await axios.delete(`${BASEURL}/users/delete-users`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { ids: userIds }
        });
        console.log(response);
        fetchUsers(); // Fetch the updated product list after deletion
      } catch (error) {
        console.error(
          "Error deleting useers:",
          error.response?.data?.message || error.message
        );
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(users.map((user) => user._id)); // Select all
    }
    setAllSelected(!allSelected);
  };

  const handleRowSelect = (id) => {
    console.log(id);
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id)); // Deselect
    } else {
      setSelectedUsers([...selectedUsers, id]); // Select
    }
  };
  console.log(users);
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid className="Service-Container">
      <Row className="Service-Row-Style">
        <Col xl={3} className="col-xl-3-colm">
          <h1 style={{ fontWeight: "300" }}>Users</h1>
        </Col>

        <Col xl={10} className="icons-colmn">
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
            overlay={<Tooltip>Delete All</Tooltip>}
          >
            <Link>
              <button
                className="del-btn"
                onClick={(e) => deleteMultipleUsers(selectedUsers)}
              >
                <FontAwesomeIcon icon={faTrash} className="addicon" />
              </button>
            </Link>
          </OverlayTrigger>
        </Col>
      </Row>
      <div style={{ padding: "16px" }}>
        <div>
          <Table bordered hover responsive="sm" className="custom-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === users.length && users.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>SNO</th>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                <>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleRowSelect(user._id)}
                          checked={selectedUsers.includes(user._id)}
                        />
                      </td>

                      <td>{totalUsers - (offset + index)}</td>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </Container>
  );
};

export default UsersList;

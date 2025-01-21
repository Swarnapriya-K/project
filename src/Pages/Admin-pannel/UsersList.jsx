import { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner,OverlayTrigger ,Row,Col,Tooltip} from "react-bootstrap";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,

  faFileCsv,
  faFileExcel,

} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASEURL } from "../../config/config";



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

  useEffect(() => {
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
        </Col>
      </Row>
      <div style={{ padding: "16px" }}>
        <div>
            <Table bordered hover responsive="sm" className="custom-table">
            <thead>
              <tr>
                <th>SNO</th>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <tr key={user._id}>
                  <td>{index+1}</td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default UsersList;

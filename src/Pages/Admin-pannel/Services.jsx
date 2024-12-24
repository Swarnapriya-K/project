import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import ServiceList from "./ServiceList";

const Services = () => {
  return (
    <>
      <div>
        <Container fluid className="Service-Container">
          <Row className="Service-Row-Style">
            <Col xl={3} className="col-xl-3-colm">
              <h1 style={{ fontWeight: "300" }}>Services</h1>{" "}
              {/* Corrected 'fontweight' to 'fontWeight' */}
            </Col>
            <Col xl={5}>
              <ul>
                <Link className="Admin-sidebar">
                  <li>Home</li>
                  <li style={{ color: "#4291e7" }}>Services</li>{" "}
                  {/* Corrected 'Catagories' to 'Categories' */}
                </Link>
              </ul>
            </Col>
            <Col className="icons-colmn">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Add New</Tooltip>}
              >
                <Link to={"/admin/services/add-service"} className="add-btn">
                  <FontAwesomeIcon icon={faPlus} className="addicon" />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Rebuild</Tooltip>}
              >
                <button className="ref-btn">
                  <FontAwesomeIcon icon={faRefresh} className="reficon" />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <button className="del-btn">
                  <FontAwesomeIcon icon={faTrash} className="delicon" />
                </button>
              </OverlayTrigger>
            </Col>
          </Row>

          <hr className="hr-line-design2" />
          <Row>
            <ServiceList />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Services;

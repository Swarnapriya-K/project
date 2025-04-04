import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply} from "@fortawesome/free-solid-svg-icons";
import AddProductForm from "./AddProductForm";

function AddProductsContainer() {
  return (
    <div>
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Product</h1>{" "}
          </Col>
          <Col xl={5}>
            <ul>
              <Link to={"/admin/catalog/products"} className="Admin-sidebar">
                <li style={{ color: "#4291e7" }}>Products</li>{" "}
              </Link>
            </ul>
          </Col>
          <Col className="icons-colmn">
            <Link to={"/admin/catalog/products"}>
              <OverlayTrigger
                placement="top" // Tooltip will appear on top of the button
                overlay={<Tooltip>Cancel</Tooltip>}
              >
                <button className="del-btn">
                  <FontAwesomeIcon icon={faReply} className="delicon" />
                </button>
              </OverlayTrigger>
            </Link>
          </Col>
        </Row>

        <hr className="hr-line-design2" />
        <Row>
          <AddProductForm />
        </Row>
      </Container>
    </div>
  );
}

export default AddProductsContainer;

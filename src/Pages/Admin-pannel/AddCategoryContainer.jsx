import React from 'react'
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faSave } from "@fortawesome/free-solid-svg-icons";
import AddCategoryForm from './AddCategoryForm';

function AddCategoryContainer() {
  return (
    <div>
      <Container fluid className="">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Categories</h1>{" "}
          </Col>
          <Col xl={5}>
            <ul>
              <Link className="Admin-sidebar">
                {/* <Link to={"/admin"}>Home</Link> */}
                <Link className='Link-style-remove' to={"/admin/catalog/category"}>Category</Link>
              </Link>
            </ul>
          </Col>
          <Col className="icons-colmn">
            <OverlayTrigger
              placement="top" // Tooltip will appear on top of the button
              overlay={<Tooltip>Cancel</Tooltip>}
            >
              <Link to={"/admin/catalog/category"}>
                <button className="del-btn">
                  <FontAwesomeIcon icon={faReply} className="delicon" />
                </button>
              </Link>
            </OverlayTrigger>
          </Col>
        </Row>

        <hr className="hr-line-design2" />
        <Row>
          <AddCategoryForm />
        </Row>
      </Container>
    </div>
  );
}

export default AddCategoryContainer;
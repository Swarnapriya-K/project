import React from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply,faSave} from "@fortawesome/free-solid-svg-icons";
import AddProductForm from "./AddProductForm";

function AddProductsContainer() {
  return (
    <div>
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Product</h1>{" "}
            {/* Corrected 'fontweight' to 'fontWeight' */}
          </Col>
          <Col xl={5}>
            <ul>
              <Link to={"/admin/catalog/products"} className="Admin-sidebar">
                
                <li style={{ color: "#4291e7" }}>Product</li>{" "}
                {/* Corrected 'Catagories' to 'Categories' */}
              </Link>
            </ul>
          </Col>
          <Col className="icons-colmn">
           
            <OverlayTrigger
                         placement="top" // Tooltip will appear on top of the button
                         overlay={<Tooltip>Save</Tooltip>}
                       >
                         <button className="ref-btn">
                           <FontAwesomeIcon icon={faSave} className="reficon" />
                         </button>
                       </OverlayTrigger>
                       <OverlayTrigger
                         placement="top" // Tooltip will appear on top of the button
                         overlay={<Tooltip>Cancel</Tooltip>}
                       >
                         <button className="del-btn">
                           <FontAwesomeIcon icon={faReply} className="delicon" />
                         </button>
                       </OverlayTrigger>
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

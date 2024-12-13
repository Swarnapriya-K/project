import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCreditCard,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

const Details = [
  {
    catagories: "TOTAL ORDERS",
    percentage: "0%",
    detailIcons: faShoppingCart,
    counts: "757",
    footerDetail: "view more.."
  },
  {
    catagories: "TOTAL SALES",
    percentage: "0%",
    detailIcons: faCreditCard,
    counts: "146.9K",
    footerDetail: "view more.."
  },
  {
    catagories: "TOTAL CUSTOMERS",
    percentage: "0%",
    detailIcons: faUser,
    counts: "900",
    footerDetail: "view more.."
  },
  {
    catagories: "PEOPLE ONLINE",
    percentage: "0%",
    detailIcons: faUsers,
    counts: "5",
    footerDetail: "view more.."
  }
];

function DetailCards() {
  return (
    <Container fluid>
      <Row className="Details-cards">
        {Details.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="card-col">
            <div className="card-inner-div">
              <div>
                <Row className="card-row1">
                  <Col>
                    <h3 className="catagory-name">{item.catagories}</h3>
                  </Col>
                  <Col>
                    <p className="card-percentage">{item.percentage}</p>
                  </Col>
                </Row>
              </div>
              <div>
                <Row className="card-row2">
                  <Col>
                    <FontAwesomeIcon
                      icon={item.detailIcons}
                      className="card-icon"
                      style={{ fontSize: "40px"}}
                    />
                  </Col>
                  <Col>
                    <h2 className="card-count">{item.counts}</h2>
                  </Col>
                </Row>
              </div>
              <Row className="card-row3">
                <h4 className="card-footer-text">{item.footerDetail}</h4>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DetailCards;

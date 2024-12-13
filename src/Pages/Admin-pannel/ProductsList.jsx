import React from 'react'
import { Col, Row, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPencil } from "@fortawesome/free-solid-svg-icons";
import picture1 from "../images/Massage-creeem.png";
import picture2 from "../images/almond.png"
import picture3 from "../images/black-sofa.png"
import picture4 from "../images/stretch-cream.png"
import picture5 from "../images/massage-oil.png"
import picture6 from "../images/body-lotion.png"
import picture7 from "../images/sofa.png"
import picture8 from "../images/free-lotion.png"
import picture9 from "../images/nivea.png"
import picture10 from "../images/table.png"




const products = [
  {
    id: 0,
    productName: "Massage Cream",
    productPrice: "79",
    productimg: picture1,
    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 1,
    productName: "Almond Massage Cream",
    productPrice: "29",
    productimg: picture2,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 2,
    productName: "Black Massage Sofa",
    productPrice: "600",
    productimg: picture3,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 3,
    productName: "StrechMark Massage Cream",
    productPrice: "77",
    productimg: picture4,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 4,
    productName: "Veleda Massage Oil",
    productPrice: "49",
    productimg: picture5,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 5,
    productName: "Body Lotion For Massage",
    productPrice: "99",
    productimg: picture6,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 6,
    productName: "Massage Sofa",
    productPrice: "390",
    productimg: picture7,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 7,
    productName: "Innissfree Massage Lotion",
    productPrice: "70",
    productimg: picture8,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 8,
    productName: "Nivea Massage Lotion",
    productPrice: "79",
    productimg: picture9,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  },
  {
    id: 9,
    productName: "Massage Table",
    productPrice: "450",
    productimg: picture10,

    Discount: "",
    quantity: "100",
    status: "Enabled"
  }
];



const ProductsList = () => {
  return (
    <>
      <div className="service-list-Container">
        <Row className="Service-inner-row">
          <Col xl={1} className="servicelist-icon">
            <FontAwesomeIcon icon={faList} />
          </Col>
          <Col>Product List</Col>
        </Row>
        <div className="Service-innerList">
          <Row className="Service-list-items">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th>
                    Image
                  </th>
                  <th>Products Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>
                        <img
                          src={product.productimg}
                          alt=""
                          style={{ width: "40px" }}
                        />
                      </td>
                      <td>{product.productName}</td>

                      <td>{product.productPrice}</td>
                      <td>{product.Discount}</td>
                      <td>{product.quantity}</td>
                      <td>{product.status}</td>
                      <td
                        style={{
                          textAlign: "end"
                        }}
                      >
                        <OverlayTrigger
                          placement="top" // Tooltip will appear on top of the button
                          overlay={
                            <Tooltip id={`tooltip-top-${product.id}`}>
                              Edit
                            </Tooltip>
                          }
                        >
                          <button className="edit-btn">
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ProductsList
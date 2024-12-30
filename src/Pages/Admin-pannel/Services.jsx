import { React, useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import ServiceList from "./ServiceList";
import axios from "axios";
import { BASEURL } from "../../config/config";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASEURL}/service/get-services`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
   const deleteMultipleServices = async (serviceIds) => {
     try {
       const response = await axios.delete(
         `${BASEURL}/products/delete-services`,
         {
           headers: {
             Authorization: `Bearer ${token}`
           },
           data: { ids: serviceIds }
         }
       );
       console.log(response);
       fetchServices();
     } catch (error) {
       console.error(
         "Error deleting services:",
         error.response?.data?.message || error.message
       );
     }
   };

  return (
    <div>
      <Container fluid className="Service-Container">
        <Row className="Service-Row-Style">
          <Col xl={3} className="col-xl-3-colm">
            <h1 style={{ fontWeight: "300" }}>Services</h1>
          </Col>
          <Col xl={5}>
            <ul>
              <Link className="Admin-sidebar">
                <li>Home</li>
                <li style={{ color: "#4291e7" }}>Services</li>
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
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <button
                className="del-btn"
                onClick={() => deleteMultipleServices(selectedServices)}
              >
                <FontAwesomeIcon icon={faTrash} className="delicon" />
              </button>
            </OverlayTrigger>
          </Col>
        </Row>

        <hr className="hr-line-design2" />
        <Row>
          <ServiceList
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            services={services} 
          />
        </Row>
      </Container>
    </div>
  );
};

export default Services;

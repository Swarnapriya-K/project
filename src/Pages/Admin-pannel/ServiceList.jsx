import React, { useState, useEffect } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASEURL } from "../../config/config";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  // Fetch services from backend
  const fetchServices = async () => {
    const token = localStorage.getItem("token");
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

  // Handle header checkbox toggle
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedServices([]); // Deselect all
    } else {
      setSelectedServices(services.map((service) => service._id)); // Select all
    }
    setAllSelected(!allSelected);
  };

  // Handle individual row checkbox toggle
  const handleRowSelect = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(
        selectedServices.filter((serviceId) => serviceId !== id)
      ); // Deselect
    } else {
      setSelectedServices([...selectedServices, id]); // Select
    }
  };

  // Update header checkbox state when individual rows are toggled
  useEffect(() => {
    setAllSelected(
      selectedServices.length === services.length && services.length > 0
    );
  }, [selectedServices, services]);

  return (
    <div className="service-list-Container">
      <Row className="Service-inner-row">
        <Col xl={1} className="servicelist-icon">
          <FontAwesomeIcon icon={faList} />
        </Col>
        <Col>Product List</Col>
      </Row>
      <Row className="table-border-outline" >
        <Table bordered hover className="table-borderline">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service._id)}
                      onChange={() => handleRowSelect(service._id)}
                    />
                  </td>
                  <td>{service.serviceName}</td>
                  <td>{service.servicePrice}</td>
                  <td>
                    <button className="edit-btn">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default ServiceList;

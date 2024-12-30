// AddServiceForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";
import { useLocation } from "react-router";
import axios from "axios";
import { BASEURL } from "../../config/config";

const AddServiceForm = ({ onServiceAdded }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    servicePrice: null,
    description: ""
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch service providers from backend
  const fetchServiceProviders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASEURL}/service/serviceProviders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServiceProviders(
        response.data.data.map((serviceProvider) => ({
          value: serviceProvider._id,
          label: serviceProvider.name
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  // Get data if the user is editing a service
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state) {
      setFormData(state);
    }
  }, [state]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.serviceName.trim()) {
      errors.serviceName = "Service name is required.";
    }
    if (formData.servicePrice === null || formData.servicePrice < 1) {
      errors.servicePrice = "Service price must be at least 1.";
    }
    return errors;
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeSelect = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    const data = {
      serviceName: formData.serviceName,
      servicePrice: formData.servicePrice,
      description: formData.description,
      serviceProviders: selectedOptions.map((option) => option.value)
    };

    try {
      const response = await axios.post(
        `${BASEURL}/service/add-service`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data); // Log response data for success
      // onServiceAdded(); // Trigger a service list refresh
      alert("Service added successfully!");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="addcard">
        <div className="card-body">
          <h5>Add Service</h5>
          <Tabs defaultActiveKey="general" id="service-tabs" className="mb-3">
            <Tab eventKey="general" title="General">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Service Name"
                    required
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChangeEdit}
                  />
                  <Form.Text className="text-danger">
                    {errors.serviceName}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Service Benefits</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChangeEdit}
                  />
                  <Form.Text className="text-danger">
                    {errors.description}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Service Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    required
                    name="servicePrice"
                    value={formData.servicePrice}
                    onChange={handleChangeEdit}
                  />
                  <Form.Text className="text-danger">
                    {errors.servicePrice}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Members</Form.Label>
                  <Select
                    isMulti
                    options={serviceProviders}
                    value={selectedOptions}
                    onChange={handleChangeSelect}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleSubmit}
                >
                  Save Service
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;

import axios from "axios";
import { React, useEffect, useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { BASEURL } from "../../config/config";

const AddServiceForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  const fetchServiceProviders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASEURL}/service/serviceProviders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);
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

  console.log(serviceProviders);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" }
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="container mt-4">
      <div className="addcard">
        <div className="card-body">
          <h5>Add Service</h5>
          <Tabs defaultActiveKey="general" id="product-tabs" className="mb-3">
            <Tab eventKey="general" title="General">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Benifits</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Price</Form.Label>
                  <Form.Control type="number" placeholder="Price" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept="image/*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select Categories</Form.Label>
                  <Select
                    isMulti
                    options={serviceProviders}
                    value={selectedOptions}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Tab>

            <Tab eventKey="data" title="Data">
              <p>Data tab content goes here...</p>
            </Tab>
          </Tabs>

          <Button variant="primary" className="mt-3">
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;

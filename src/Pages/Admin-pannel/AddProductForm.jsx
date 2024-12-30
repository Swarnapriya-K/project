import { React, useEffect, useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useLocation } from "react-router";
import axios from "axios";
import { BASEURL } from "../../config/config";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"]
  ]
};
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: null,
    productQuantity: null,
    discount: null,
    description: "",
    image: null
  });

  const location = useLocation();
  const state = location.state;

  console.log(state);

  useEffect(() => {
    if (state) {
      setFormData(state);
    }
  }, [state]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.productName.trim()) {
      errors.productName = "Product name is required.";
    }
    if (formData.productPrice === null || formData.productPrice < 1) {
      errors.productPrice = "Product price must be at least 1.";
    }
    if (formData.productQuantity === null || formData.productQuantity < 1) {
      errors.productQuantity = "Product quantity must be at least 1.";
    }
    if (
      formData.discount !== null &&
      (formData.discount < 0 || formData.discount > 100)
    ) {
      errors.discount = "Discount must be between 0 and 100.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ASDfasdfasdf");
    const token = localStorage.getItem("token");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const data = new FormData();

      // Append fields to FormData
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      data.append("productQuantity", formData.productQuantity);
      data.append("discount", formData.discount || 0);
      data.append("description", formData.description || "");


      //Add products
      if (formData.image) {
        data.append("image", formData.image);
      }

      try {
        const response = await axios.post(
          `${BASEURL}/products/add-product`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response);
        // setMessage(responseJson);
        // setOrderPlaced(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="addcard">
        <div className="card-body">
          <h5>{state ? "Edit" : "Add"} Product</h5>
          <Tabs defaultActiveKey="general" id="product-tabs" className="mb-3">
            <Tab eventKey="general" title="General">
              <Form
                noValidate
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    required
                    value={formData.productName}
                    name="productName"
                    onChange={handleChange}
                  />
                  <Form.Text>{errors.productName}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    required
                    value={formData.productPrice}
                    name="productPrice"
                    onChange={handleChange}
                  />
                  <Form.Text>{errors.productPrice}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Qunatity"
                    required
                    value={formData.productQuantity}
                    name="productQuantity"
                    onChange={handleChange}
                  />
                  <Form.Text>{errors.productQuantity}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Discount"
                    required
                    value={formData.discount}
                    name="discount"
                    onChange={handleChange}
                  />
                  <Form.Text>{errors.discount}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    style={{ height: "200px" }} // Adjust height as needed
                    modules={modules}
                    name="description"
                  />
                </Form.Group>
                <Button variant="primary" className="mt-5" type="submit">
                  Save Product
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="data" title="Data">
              <p>Data tab content goes here...</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

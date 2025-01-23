import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { BASEURL } from "../../config/config"; // Ensure this is your correct backend URL
import { useLocation, useNavigate } from "react-router";
import "./AddProductForm.css"; // Custom CSS for additional styling

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: null,
    description: "",
    image: null,
    categoryId: ""
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]); // State to store category list
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to handle loading spinner

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // For edit functionality

  useEffect(() => {
    if (state) {
      setFormData(state);
      setFile(BASEURL + "/" + state.image); // Set the image URL if editing
    }
  }, [state]);

  // Fetch category list from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Show loading spinner
      try {
        const response = await axios.get(`${BASEURL}/category/get-category`);
        // Filter out deleted categories (assumed field: deletedAt or similar)
        setCategories(
          response.data.categories.filter((category) => !category.deletedAt)
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "File size exceeds 2MB"
      }));
      return;
    }
    setFormData({ ...formData, image: file });
    setFile(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const formErrors = {};
    if (!formData.productName)
      formErrors.productName = "Product name is required";
    if (!formData.productPrice || formData.productPrice <= 0)
      formErrors.productPrice = "Product price must be a positive number";
    if (!formData.categoryId) formErrors.category = "Category is required";
    if (!formData.image) formErrors.image = "Image is required";

    setErrors(formErrors);

    // If there are validation errors, exit
    if (Object.keys(formErrors).length > 0) return;

    // Form submission logic
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("description", formData.description || "");
    data.append("categoryId", formData.categoryId);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("token");
      let response;
      if (state) {
        response = await axios.patch(
          `${BASEURL}/products/edit-product/${state._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        response = await axios.post(`${BASEURL}/products/add-product`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
      }
      setErrors({}); // Clear errors on success
      // navigate("/admin/catalog/products");
      alert(" Item Added Succesfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className="add-product-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="add-product-form-wrapper">
            <h3 className="add-product-title text-center mb-4">
              {state ? "Edit" : "Add"} Product
            </h3>
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="add-product-form"
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      required
                      value={formData.productName}
                      name="productName"
                      onChange={handleChange}
                      className={`add-product-input ${
                        errors.productName ? "is-invalid" : ""
                      }`}
                    />
                    <Form.Text className="text-danger">
                      {errors.productName}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      required
                      value={formData.productPrice}
                      name="productPrice"
                      onChange={handleChange}
                      className={`add-product-input ${
                        errors.productPrice ? "is-invalid" : ""
                      }`}
                    />
                    <Form.Text className="text-danger">
                      {errors.productPrice}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Main Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className={`add-product-input ${
                        errors.category ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">
                        {state &&
                        !categories.find(
                          (cat) => cat._id === formData.categoryId
                        )
                          ? "Category Deleted"
                          : "Select a category"}
                      </option>
                      {loading ? (
                        <option disabled>Loading categories...</option>
                      ) : (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </Form.Control>
                    <Form.Text className="text-danger">
                      {errors.category}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`add-product-input ${
                        errors.image ? "is-invalid" : ""
                      }`}
                    />
                    {file && (
                      <img
                        src={file}
                        alt="Preview"
                        className="add-product-img-preview mt-2"
                      />
                    )}
                    <Form.Text className="text-danger">
                      {errors.image}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value
                        })
                      }
                      className="add-product-textarea form-control"
                      placeholder="Product description"
                      rows="4"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="add-product-btn"
                >
                  Save Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductForm;

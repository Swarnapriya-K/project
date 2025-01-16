import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Spinner } from "react-bootstrap";
import { BASEURL } from "../../config/config"; // Ensure this is your correct backend URL
import { useLocation, useNavigate } from "react-router";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: null,
    discount: null,
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
    if (formData.discount && formData.discount < 0)
      formErrors.discount = "Discount cannot be negative";
    if (!formData.categoryId) formErrors.category = "Category is required";

    setErrors(formErrors);

    // If there are validation errors, exit
    if (Object.keys(formErrors).length > 0) return;

    // Form submission logic
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("discount", formData.discount || 0);
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
      navigate("/admin/catalog/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="addcard">
        <div className="card-body">
          <h5>{state ? "Edit" : "Add"} Product</h5>

          <Form noValidate onSubmit={handleSubmit}>
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
              <Form.Text className="text-danger">
                {errors.productName}
              </Form.Text>
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
              <Form.Text className="text-danger">
                {errors.productPrice}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">
                  {state &&
                  !categories.find((cat) => cat._id === formData.categoryId)
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
              <Form.Text className="text-danger">{errors.category}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount"
                value={formData.discount}
                name="discount"
                onChange={handleChange}
              />
              <Form.Text className="text-danger">{errors.discount}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {file && (
                <img src={file} alt="Preview" style={{ width: "100px" }} />
              )}
              <Form.Text className="text-danger">{errors.image}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="form-control"
                placeholder="Product description"
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" type="submit">
              Save Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

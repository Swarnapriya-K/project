import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { BASEURL } from "../../config/config"; // Make sure this is your correct backend URL
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

  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;
  console.log(state);

  useEffect(() => {
    if (state) {
      setFormData(state);
      setFile(BASEURL + "/" + state.image);
    }
  }, [state]);

  const [categories, setCategories] = useState([]); // State to store category list
  const [errors, setErrors] = useState({});

  // Fetch category list from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASEURL}/category/get-category`); // Adjust BASEURL as needed
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example validation (you can enhance this based on your needs)
    const formErrors = {};
    if (!formData.productName)
      formErrors.productName = "Product name is required";
    if (!formData.productPrice)
      formErrors.productPrice = "Product price is required";
    if (!formData.categoryId) formErrors.category = "Category is required";

    setErrors(formErrors); // Set the error state

    // If there are errors, return early
    if (Object.keys(formErrors).length > 0) return;

    // Assuming you are submitting the form to a different endpoint
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("discount", formData.discount || 0);
    data.append("description", formData.description || "");
    data.append("categoryId", formData.categoryId._id);

    // Add image if exists
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
        navigate("/admin/catalog/products");
      } else {
        response = await axios.post(`${BASEURL}/products/add-product`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });
        navigate("/admin/catalog/products");
        console.log(response.data);
      } // Handle the response data as needed
    } catch (error) {
      console.error(error);
    }
  };

  //    e.preventDefault();
  //    try {
  //      // Sending form data to the backend using axios

  //      let response;
  //      if (state) {
  //        response = await axios.patch(
  //          `${BASEURL}/category/edit-category/${state._id}`,
  //          { name: formData.name },
  //          {
  //            headers: {
  //              Authorization: `Bearer ${token}`
  //            }
  //          }
  //        );
  //      } else {
  //        response = await axios.post(
  //          `${BASEURL}/category/add-category`,
  //          { name: formData.name },
  //          {
  //            headers: {
  //              Authorization: `Bearer ${token}`
  //            }
  //          }
  //        );
  //      }
  //      navigate("/admin/catalog/category");
  //      console.log("Category added successfully:", response.data);
  //    } catch (error) {
  //      console.error("Error adding category:", error);
  //    }
  //  };

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
              <Form.Label>Main Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text>{errors.category}</Form.Text>
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
              <Form.Text>{errors.discount}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <img src={file} alt="asfd" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="form-control"
                placeholder="Product description"
              />
            </Form.Group>

            <Button variant="primary" className="mt-5" type="submit">
              Save Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

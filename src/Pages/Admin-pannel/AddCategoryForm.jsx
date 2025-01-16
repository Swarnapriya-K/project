import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios"; // Import axios for sending HTTP requests
import { BASEURL } from "../../config/config";

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Category state passed for editing

  // Initialize formData when state (category) is passed for editing
  useEffect(() => {
    if (state) {
      setFormData(state); // Populate form data with category state for editing
    }
  }, [state]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // Use PATCH for editing, POST for adding new category
      if (state) {
        // Editing an existing category (PATCH request)
        response = await axios.patch(
          `${BASEURL}/category/edit-category/${state._id}`,
          { name: formData.name },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        // Adding a new category (POST request)
        response = await axios.post(
          `${BASEURL}/category/add-category`,
          { name: formData.name },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      // Redirect to the category list page after successful operation
      navigate("/admin/catalog/category");
      console.log("Category successfully saved:", response.data);
    } catch (error) {
      console.error("Error saving category:", error);
      alert(
        error?.response?.data?.message ||
          "An error occurred while saving the category."
      );
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{state ? "Edit" : "Add"} Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {state ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;

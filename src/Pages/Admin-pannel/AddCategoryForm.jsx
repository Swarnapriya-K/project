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
  const state = location.state;

  console.log(state);

  useEffect(() => {
    if (state) {
      setFormData(state);
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
      // Sending form data to the backend using axios

      let response;
      if (state) {
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
      navigate("/admin/catalog/category");
      console.log("Category added successfully:", response.data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{state ? "Edit" : "Add"} Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mainCategory" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            value={formData.name}
            name={"name"}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;

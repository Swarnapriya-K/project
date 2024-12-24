import {React,useState} from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProductForm= () => {
    const [value, setValue] = useState("");
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

  return (
    <div className="container mt-4">
      <div className="addcard">
        <div className="card-body">
          <h5>Add Product</h5>
          <Tabs defaultActiveKey="general" id="product-tabs" className="mb-3">
            <Tab eventKey="general" title="General">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="number" placeholder="Price" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control type="number" placeholder="Qunatity" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control type="text" placeholder="Discount" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept="image/*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder="Description"
                    style={{ height: "200px" }} // Adjust height as needed
                    modules={modules}
                  />
                </Form.Group>
              </Form>
            </Tab>
           
            <Tab eventKey="data" title="Data">
              <p>Data tab content goes here...</p>
            </Tab>
          </Tabs>

          <Button variant="primary" className="mt-5">
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

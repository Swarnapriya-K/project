import { useState, React } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import LoginAdmin from "./LoginAdmin";

function AdminHome() {
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
 
  const handleClose = () => setShowModal(false);

  return (
    <div>
     
        <LoginAdmin showModal={showModal} handleClose={handleClose} />
 
    </div>
  );
}

export default AdminHome;

import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaUser, FaLock, FaKey } from "react-icons/fa";
import adminlogo from "../images/admin-logo.png";
import "./Loginpage.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Correct use of useNavigate

  const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    if (!username && !password) {
      setError("Please fill both fields");
      return;
    }

    if (username === "") {
      setError("Please fill the username field");
      return;
    }

    if (password === "") {
      setError("Please fill the password field");
      return;
    }

    if (!usernameRegex.test(username)) {
      setError(
        "Username must be at least 6 characters long and only contain letters and numbers."
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }

    setError("");
    console.log("Logged in:", { username, password });
    login();
    navigate("/admin/");
  };

  return (
    <div className="container-form">
      <header
        id="header"
        className="navbar navbar-static-top navbar-login-style"
      >
        <div className="header-div">
          <div id="header-logo" className="navbar-header">
            <a
              href="https://www.ecomdeveloper.com/demo/admin/index.php?route=common/login"
              className="navbar-brand"
            >
              <img src={adminlogo} alt="OpenCart" title="OpenCart" />
            </a>
          </div>
        </div>
      </header>

      <div id="content">
        <Container fluid>
          <br />
          <Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1 className="panel-title">
                    <FaLock /> Please enter your login details.
                  </h1>
                </div>
                <div className="panel-body">
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3 mx-2 form-group"
                      controlId="input-username"
                    >
                      <Form.Label>Username</Form.Label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FaUser />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                    <hr />
                    <Form.Group
                      className="mb-3 mx-2 form-group"
                      controlId="input-password"
                    >
                      <Form.Label>Password</Form.Label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FaLock />
                        </span>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <span className="help-block">
                        <a href="#2" className="fp-styling">
                          Forgotten Password
                        </a>
                      </span>
                    </Form.Group>

                    <div className="text-right">
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-styling"
                      >
                        <FaKey /> Login
                      </Button>
                    </div>

                    <input
                      type="hidden"
                      name="redirect"
                      value="https://www.ecomdeveloper.com/demo/admin/index.php?route=common/login"
                    />
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoginAdmin;

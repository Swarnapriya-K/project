import React, { useState, useContext } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Correct use of useNavigate

  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

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

    setError("");
    login(username, password);
  };
  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <div className="form-container">
          <h2>Login</h2>
          <p>{error}</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

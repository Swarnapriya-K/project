import React from "react";
import "./LoginSignup.css";

const Signup = () => {
  return (
    <div className="container-wrapper">
      <div className="container">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form>
            <input type="text" placeholder="User name" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

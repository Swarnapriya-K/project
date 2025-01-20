import React, { useContext } from "react";
import adminlogo from "../images/admin-logo.png";
import profileimg from "../images/profile-45x45.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const {logout} = useContext(AuthContext)
  return (
    <>
      <div>
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
          <div className="d-flex" style={{ paddingRight: "10px" }}>
            <button
              className="btn  text-dark d-flex align-items-center"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={profileimg}
                alt="User Avatar"
                className="rounded-circle me-2"
                width={40}
                height={40}
              />
              <span>Demo User</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <a className="dropdown-item" href="#profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#settings">
                  Settings
                </a>
              </li>
              <li>Logout</li>
            </ul>
            <button style={{ all: "unset" }} onClick={()=> logout()}>
              <FontAwesomeIcon
                icon={faSignOut}
               
              />{" "}
              Logout
            </button>
          </div>
        </header>
      </div>
    </>
  );
}

export default Dashboard;

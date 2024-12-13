import React from 'react'
import adminlogo from "../images/admin-logo.png"
import "./Dashboard.css"

function Dashboard() {
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
        </header>
      </div>
    </>
  );
}

export default Dashboard;
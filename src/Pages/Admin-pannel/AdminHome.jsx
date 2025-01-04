import React, { useState } from "react";

import LoginAdmin from "./LoginAdmin";
import { Route, Routes } from "react-router";
import DashboardHome from "./DashboardHome";
import SideBar from "./SideBar";

function AdminHome() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || undefined
  );

  const handleClose = () => setShowModal(false);

  console.log(isLoggedIn);
  return (
    <div>
      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={
              <LoginAdmin
                showModal={showModal}
                handleClose={handleClose}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      ) : (
        <div style={{ display: "flex" }}>
          <SideBar />
          <div style={{ flex: 1, padding: "1rem" }}>
            <Routes>
              {/* <Route path="/" element={<DashboardHome />} /> */}
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/category" element={<>Category</>} />
              <Route path="/products" element={<>products</>} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHome;

import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";

const AdminRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn ? (
        <>
        
          <Dashboard />
          <div style={{ display: "flex", overflow: "hidden" }}>
            <SideBar />
            <div style={{ flex: "1" }}>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/admin/login"} />
      )}
    </>
  );
};

export default AdminRoutes;

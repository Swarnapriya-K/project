import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import AdminHome from "./AdminHome";

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
        <Navigate to={"/admin/login"} replace />
      )}
    </>
  );
};

export default AdminRoutes;

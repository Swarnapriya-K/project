import React from "react";
import { Outlet } from "react-router";
import Header from "./Navigation";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserLayout;

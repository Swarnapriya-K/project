import React from "react";

import "./Dashboard.css";
import AdminSidePage from "./AdminSidePage";
import DetailCards from "./DetailCards";

import AdminAnalytic from "./AdminAnalytic";
function DashboardHome() {
  return (
    <div>
        <AdminSidePage />
        <DetailCards />
        <AdminAnalytic />
     
    </div>
  );
}

export default DashboardHome;

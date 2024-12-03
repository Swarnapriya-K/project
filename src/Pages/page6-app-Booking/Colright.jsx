import React from "react";
import SectionSecHeader from "../components/SectionSecHeader";
import BookingTable from "./BookingTable";

function Colright() {
  return (
    <div className="right-colmn">
      <div className="booking-text">
        <SectionSecHeader subtitle={"Book Today"} />
        <h1 className="booking-txt2">Make An Appointment</h1>
      </div>
      <div className="booking-table">
        <BookingTable />
      </div>
    </div>
  );
}

export default Colright;

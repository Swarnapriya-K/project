import React from "react";

function Buttons({ packageDetails, handlePackageClick, activestate }) {
  return (
    <div className="button-container">
      {packageDetails.map((packageDetail, index) => (
        <div key={index} className="button-block">
          <button
            className="button1"
            style={{
              backgroundColor:
                activestate === packageDetail.id ? "#f6526d" : "transparent",
              color: activestate === packageDetail.id ? "white" : "#787070"
            }}
            onClick={() => handlePackageClick(packageDetail.id)}
          >
            <p style={{ marginBottom: "0px" }}>{packageDetail.packageName}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Buttons;

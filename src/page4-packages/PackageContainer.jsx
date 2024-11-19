import React from "react";
import { Col, Row } from "react-bootstrap";

const PackageContainer = ({ selectedPackage }) => {
  console.log(selectedPackage.packageDetails)
  return (
    <div style={{ position: "relative" }}>
      <div className="imgstyle">
        <img
          style={{ width: "100%" }}
          src={selectedPackage.coimg}
          alt={selectedPackage.packageName}
        />
      </div>
      <div className="packdetails">
        <h2>{selectedPackage.packageName}</h2>
        <ul>
          {selectedPackage.packageDetails.map((items) => (
            <div>{<li>{items}</li>}</div>
          ))}
        </ul>
        <div style={{display:"flex"}}>
          <span>NOW JUST</span>
          <h5 className="packagerate">${selectedPackage.amount}</h5>
        </div>
      </div>
    </div>
  );
};

export default PackageContainer;

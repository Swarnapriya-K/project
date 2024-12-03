import React from "react";
import {  Container} from "react-bootstrap";


function OfferContainer({
  packagebanner,
  bgcolor,
  offer,
  packagetext,
  buttontext,
  buttoncolor
}) {
  return (
    <>
      <Container fluid className="offer-main-container">
        <div className="img-banner">
          <img src={packagebanner} alt="" />
          <div className="offer-div-container">
          <div
            style={{ backgroundColor: bgcolor }}
            className="offer-inner-container"
          >
            <div className="offer-row1">
              <h4 className="package-text">{packagetext}</h4>
            </div>
            <div className="offer-row2">
              <h2 className="offer-text">{offer}</h2>
            </div>
            <div className="offer-row3">
              <button
                className="gift-button"
                style={{ backgroundColor: buttoncolor }}
              >
                <h4 className="button-text">{buttontext}</h4>
              </button>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </>
  );
}

export default OfferContainer;

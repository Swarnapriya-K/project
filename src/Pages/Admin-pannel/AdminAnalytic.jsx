import React from 'react'
import { Col, Row } from 'react-bootstrap';
import mapimg from "../images/map.png"

function AdminAnalytic() {
  return (
    <div>
      <Row className="Analytic-page">
        <Col xl={6}>
          <div className='map-div'>
            <img src={mapimg} className="map-img" alt="" />
          </div>
        </Col>
        <Col xl={6}>
        <div className='sale-Analytic'>
        </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminAnalytic;
import React from "react";
import { Col, Row, Table,Tooltip,OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList,faPencil } from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    id: "6747fa597c13f8dad2bd794c",
    name: "Deep Tissue Massage",
    serviceProviders: [
      {
        serviceProviderId: "674d790aba9dfda1041d1582",
        name: "Eliana Ivy"
      },
      {
        serviceProviderId: "674d7ba094f3dd36f4a278e7",
        name: "Amelia Ava"
      },
      {
        serviceProviderId: "674d7a575671de436137b5f8",
        name: "Stella Zoe"
      },
      {
        serviceProviderId: "674d7a1d5671de436137b5f1",
        name: "Harper Luna"
      }
    ]
  },
  {
    id: "6747facb7c13f8dad2bd794e",
    name: "Detox Therapy Service",
    serviceProviders: [
      {
        serviceProviderId: "674d7a3d5671de436137b5f5",
        name: "Elena Naomi"
      },
      {
        serviceProviderId: "674d7a1d5671de436137b5f1",
        name: "Harper Luna"
      }
    ]
  },
  {
    id: "6747fad77c13f8dad2bd7950",
    name: "Vacuum Suction Therapy",
    serviceProviders: [
      {
        serviceProviderId: "674d7b6e94f3dd36f4a278e1",
        name: "Emma Lee"
      },
      {
        serviceProviderId: "674d7a575671de436137b5f8",
        name: "Stella Zoe"
      },
      {
        serviceProviderId: "674d7a1d5671de436137b5f1",
        name: "Harper Luna"
      }
    ]
  },
  {
    id: "6747fae67c13f8dad2bd7952",
    name: "Booking Payment Service",
    serviceProviders: [
      {
        serviceProviderId: "674d7ba094f3dd36f4a278e7",
        name: "Amelia Ava"
      },
      {
        serviceProviderId: "674d7b5594f3dd36f4a278de",
        name: "Olivia John"
      }
    ]
  },
  {
    id: "6747faf37c13f8dad2bd7954",
    name: "Face Therapy Service",
    serviceProviders: [
      {
        serviceProviderId: "674d7a3d5671de436137b5f5",
        name: "Elena Naomi"
      },
      {
        serviceProviderId: "674d7b6e94f3dd36f4a278e1",
        name: "Emma Lee"
      },
      {
        serviceProviderId: "674d7ba094f3dd36f4a278e7",
        name: "Amelia Ava"
      },
      {
        serviceProviderId: "674d7b5594f3dd36f4a278de",
        name: "Olivia John"
      },
      {
        serviceProviderId: "674d7b8994f3dd36f4a278e4",
        name: "Riley Zoey"
      }
    ]
  },
  {
    id: "6747fbb9474bd8d4e1141633",
    name: "Radio Frequency Service",
    serviceProviders: [
      {
        serviceProviderId: "674d7b5594f3dd36f4a278de",
        name: "Olivia John"
      },
      {
        serviceProviderId: "674d7b8994f3dd36f4a278e4",
        name: "Riley Zoey"
      }
    ]
  },
  {
    id: "674861065fad29a841559379",
    name: "Perfect At-Home Facial",
    serviceProviders: [
      {
        serviceProviderId: "674d7a3d5671de436137b5f5",
        name: "Elena Naomi"
      },
      {
        serviceProviderId: "674d7b8994f3dd36f4a278e4",
        name: "Riley Zoey"
      }
    ]
  },
  {
    id: "6748622a5fad29a841559384",
    name: "Wood/Metal Therapy",
    serviceProviders: [
      {
        serviceProviderId: "674d7bb794f3dd36f4a278ea",
        name: "Bella Skyler"
      },
      {
        serviceProviderId: "674d7b6e94f3dd36f4a278e1",
        name: "Emma Lee"
      },
      {
        serviceProviderId: "674d7b5594f3dd36f4a278de",
        name: "Olivia John"
      }
    ]
  },
  {
    id: "674865730b507e17edf82305",
    name: "Thermal Therapy Service",
    serviceProviders: [
      {
        serviceProviderId: "674d7bb794f3dd36f4a278ea",
        name: "Bella Skyler"
      },
      {
        serviceProviderId: "674d7a575671de436137b5f8",
        name: "Stella Zoe"
      }
    ]
  }
];

function ServiceList() {
  return (
    <>
      <div className="service-list-Container">
        <Row className="Service-inner-row">
          <Col xl={1} className="servicelist-icon">
            <FontAwesomeIcon icon={faList} />
          </Col>
          <Col>Services List</Col>
        </Row>
        <div className="Service-innerList">
          <Row className="Service-list-items">
            <Table  bordered hover>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th>Services</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) =>{
                  return (
                    <tr key={service.id}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>{service.name}</td>
                      <td
                        style={{
                          textAlign: "end"
                        }}
                      >
                        <OverlayTrigger
                          placement="top" // Tooltip will appear on top of the button
                          overlay={
                            <Tooltip id={`tooltip-top-${service.id}`}>
                              Edit
                            </Tooltip>
                          }
                        >
                          <button className="edit-btn">
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ServiceList;

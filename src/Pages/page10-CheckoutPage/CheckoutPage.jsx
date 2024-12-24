import React from "react";
import CheckoutComponent from "../components/CheckoutComponent";
import Header from "../components/Navigation";
import { Footer } from "../components/Footer";
import Checkoutinnerheader from "./Checkoutinnerheader";
import { Container } from "react-bootstrap";

const CheckoutPage = () => {
  return (
    <>
      <Container fluid>
        {/* <Header /> */}
        <Checkoutinnerheader />
        <CheckoutComponent />
        <Footer />
      </Container>
    </>
  );
};

export default CheckoutPage;

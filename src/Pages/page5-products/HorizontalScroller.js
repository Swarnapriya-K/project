import { React, useEffect, useState } from "react";

import SectionHeader from "../components/SectionHeader";
import ProductCards from "./ProductCards";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../../config/config";


function HorizontalScroller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await axios.get(`${BASEURL}/products/get-only-products`);
        // console.log(response.data);
        // setProducts(response.data.products);
        console.log("API Response:", response.data); // Verify structure here
        setProducts(response.data.products || []); 
      } catch (error) {
        console.log(error?.message);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="products-page" id="products-page">
      <SectionHeader title={"Beauty Products"} subtitle={"Need an awsome"} />
      <Container>
        <ProductCards products={products} />
      </Container>
    </div>
  );
}

export default HorizontalScroller;

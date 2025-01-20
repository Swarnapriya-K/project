import { React, useEffect, useState } from "react";

import SectionHeader from "../components/SectionHeader";
import picture1 from "../images/Massage-creeem.png";
import picture2 from "../images/almond.png";
import picture3 from "../images/black-sofa.png";
import picture4 from "../images/stretch-cream.png";
import picture5 from "../images/massage-oil.png";
import picture6 from "../images/body-lotion.png";
import picture7 from "../images/sofa.png";
import picture8 from "../images/free-lotion.png";
import picture9 from "../images/nivea.png";
import picture10 from "../images/table.png";
import ProductCards from "./ProductCards";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BASEURL } from "../../config/config";

const products = [
  {
    id: 0,
    picture: picture1,
    productname: "Massage Cream",
    price: 79
  },
  {
    id: 1,
    picture: picture2,
    productname: "Almonds Massage Cream",
    price: 29,
    discountprice: "$ 90",
    discountstyle: "discountstyling",
    discountpercentage: "82%"
  },
  {
    id: 2,
    picture: picture3,
    productname: " Black Massage Sofa",
    price: 600
  },
  {
    id: 3,
    picture: picture4,
    productname: "Stretch Mark Massage Cream",
    price: 77,
    discountprice: "$89",
    discountpercentage: "62%",
    discountstyle: "discountstyling"
  },
  {
    id: 4,
    picture: picture5,
    productname: "Veleda Massage Oil",
    price: 49
  },
  {
    id: 5,
    picture: picture6,
    productname: " Body Lotion for Massage",
    price: 99,
    discountprice: "$107",
    discountpercentage: "46%",
    discountstyle: "discountstyling"
  },
  {
    id: 6,
    picture: picture7,
    productname: "Massage Sofa",
    price: 390,
    discountprice: " $400",
    discountpercentage: "52%",
    discountstyle: "discountstyling"
  },
  {
    id: 7,
    picture: picture8,
    productname: "Inisfree Massage Lotion",
    price: 70
  },
  {
    id: 8,
    picture: picture9,
    productname: "Nivea Massage Lotion",
    price: 79
  },
  {
    id: 9,
    picture: picture10,
    productname: "Massage Table",
    price: 450
  }
];

function HorizontalScroller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await axios.get(`${BASEURL}/products/get-products`);
        console.log(response.data);
        setProducts(response.data.products);
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

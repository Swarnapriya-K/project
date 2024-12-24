import React from "react";
import { Row } from "react-bootstrap";
import Header from "./Navigation";
import NewsArticleContainer from "../page8-newsArticle/NewsArticleContainer";
import { Footer } from "./Footer";

function Blogs() {
  return (
    <>
      <div>
        <NewsArticleContainer />
      </div>

      <Footer />
    </>
  );
}

export default Blogs;

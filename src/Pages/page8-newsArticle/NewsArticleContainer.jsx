import React from "react";
import SectionHeader from "../components/SectionHeader";
import NewsArticleCard from "./NewsArticleCard";
import {Row, Col, Container } from "react-bootstrap";
import news1 from "../images/news1.jpg"
import news2 from "../images/news2.jpg"
import news3 from "../images/news3.jpg"

const newsArticleObject = [
  {
    id: 0,
    question: "Which Oil Is Better For Massage And What Are Its Benefits?",
    answer:
      "Etiam semper nibh orci, ac tincident mi consecteture a .in quis tortor ex. Morbi cursus sed neque quis dictum. Dius bibdendum ullamcor per pharetra.",
    publishedDate: "January 1, 2024",
    image: news1
  },
  {
    id: 0,
    question: "How To Maintain The Beauty And Strength Of Your Hair?",
    answer:
      "Etiam semper nibh orci, ac tincident mi consecteture a .in quis tortor ex. Morbi cursus sed neque quis dictum. Dius bibdendum ullamcor per pharetra.",
    publishedDate: "January 1, 2024",
    image: news2
  },
  {
    id: 0,
    question: "How To Avoid Sun And Dust With Facial?",
    answer:
      "Etiam semper nibh orci, ac tincident mi consecteture a .in quis tortor ex. Morbi cursus sed neque quis dictum. Dius bibdendum ullamcor per pharetra.",
    publishedDate: "January 1, 2024",
    image: news3
  }
];
const NewsArticleContainer = () => {
  return (
    <div style={{ padding: "100px 0px 80px 0px" }}>
      <Container>
        <SectionHeader title={"News & Articles"} subtitle={"Recent Blog"} />
        <Row >
          {newsArticleObject.map((article, index) => {
            return (
              <Col xl={4} lg={4} md={6}className="article-colmn">
                <NewsArticleCard
                  image={article.image}
                  question={article.question}
                  answer={article.answer}
                  publishedDate={article.publishedDate}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default NewsArticleContainer;

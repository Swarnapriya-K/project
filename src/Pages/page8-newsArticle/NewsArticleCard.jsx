import React from 'react'
import { Row } from 'react-bootstrap'


const NewsArticleCard = ({question,image,answer,publishedDate}) => {
  return (
    <>
      <Row className="article-img">
        <img src={image} alt="" />
        <div className='vertical-container'>
          <button className='vertical-button'>
            <h5 style={{fontSize:"15px"}}>{publishedDate}</h5>
          </button>
        </div>
      </Row>
      <Row>
        <h2 className="article-question"> {question}</h2>
      </Row>
      <Row>
        <h5 className='article-answer'>{answer}</h5>
      </Row>
    </>
  );
}

export default NewsArticleCard
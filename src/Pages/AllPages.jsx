import React from "react";
import Home from "../Pages/page1-Home/Home";

import Sec2home from "../Pages/page2/Section";
import "../Pages/page2/Page2.css";
import Servicepage from "../Pages/page3-services/Service-page";
import "../Pages/page3-services/service.css";
import PackageList from "../Pages/page4-packages/PackageList";
import "../Pages/page4-packages/package.css";
import HorizontalScroll from "../Pages/page5-products/HorizontalScroller";
import "../Pages/page5-products/HorizontalScroll.css";
import BookingSlot from "../Pages/page6-app-Booking/BookingSlot";
import SwiperCarousal from "../Pages/page7-vediosection/SwiperCarousal";
import "../Pages/page7-vediosection/swiperslider.css";
import VimeoVideo from "../Pages/page7-vediosection/vedio";
import NewsArticleContainer from "../Pages/page8-newsArticle/NewsArticleContainer";
import "../Pages/page8-newsArticle/article.css";
import PackageOffer from "../Pages/page9-package-offer/PackageOffer";
import "../Pages/page9-package-offer/offerPackage.css";
import { Footer } from "../Pages/components/Footer";

function AllPages() {
  return (
    <div className="app">
     <Home/>
    <Sec2home/>
    <Servicepage/>
    <PackageList/>
    <HorizontalScroll/>
    <BookingSlot/>
    <SwiperCarousal/>
    <VimeoVideo/>
    <NewsArticleContainer/>
    <PackageOffer/>
    <Footer/>
    </div>
  );
}

export default AllPages;

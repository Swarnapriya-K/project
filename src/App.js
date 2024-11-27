import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/page1-Home/Home";
import "./App.css";
import "./Pages/page1-Home/MyNavbar.css";
import "./Pages/page2/Page2.css";
import Sec2home from "./Pages/page2/Section";
import Servicepage from "./Pages/page3-services/Service-page";
import "./Pages/page3-services/service.css";
import PackageList from "./Pages/page4-packages/PackageList";
import "./Pages/page4-packages/package.css";
import HorizontalScroll from "./Pages/page5-products/HorizontalScroller";
import "./Pages/page5-products/HorizontalScroll.css";
import { Footer } from "./Pages/components/Footer";
import BookingSlot from "./Pages/page6-app-Booking/BookingSlot";

const App = () => {
    return (
      <div className="App">
        <Home />
        <Sec2home />
        <Servicepage />
        <PackageList />
        <HorizontalScroll />
        <BookingSlot />
        <Footer />
      </div>
    );
};

export default App;


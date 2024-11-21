import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Home from "./page1-Home/Home";
import "./App.css";
import "../src/page1-Home/MyNavbar.css";
import "../src/page2/Page2.css"
import Sec2home from "./page2/Section";
import Servicepage from "./page3-services/Service-page";
import "../src/page3-services/service.css"
import PackageList from "./page4-packages/PackageList";
import "../src/page4-packages/package.css"
import HorizontalScroll from "./page5-products/HorizontalScroller";
import "../src/page5-products/HorizontalScroll.css"
import { Footer } from "./components/Footer";
const App = () => {
    return (
      <div className="App">
        <Home/>
        <Sec2home />
        <Servicepage />
        <PackageList />
        <HorizontalScroll />
        <Footer/>
      </div>
    );
};

export default App;


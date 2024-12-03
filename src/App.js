import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Fix here
import "./App.css";
import "./Pages/page1-Home/MyNavbar.css";
import "./Pages/page2/Page2.css";
import "./Pages/page3-services/service.css";
import "./Pages/page4-packages/package.css";
import "./Pages/page5-products/HorizontalScroll.css";
import "./Pages/page7-vediosection/swiperslider.css";
import "./Pages/page8-newsArticle/article.css";
import "./Pages/page9-package-offer/offerPackage.css";
import AllPages from "./Pages/AllPages";
import Shoping from "./Pages/components/Shoping";
import Blogs from "./Pages/components/Blogs";
import AdminHome from "./Pages/Admin-pannel/AdminHome";

const App = () => {
  return (
    <div className="App">
      
       <Routes>
          <Route path="/" element={<AllPages />} />
          <Route path="/shop" element={<Shoping />} />
          <Route path="/our-blog" element={<Blogs />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/dashboard" element={<></>}/>
        </Routes>
    
    </div>
  );
};

export default App;

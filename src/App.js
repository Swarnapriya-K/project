import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
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
import AdminRoutes from "./Pages/Admin-pannel/AdminRoutes";
import LoginAdmin from "./Pages/Admin-pannel/LoginAdmin";
import { AuthProvider } from "./context/AuthContext";
import DashboardHome from "./Pages/Admin-pannel/DashboardHome";
import Products from "./Pages/Admin-pannel/Products";
import Services from "./Pages/Admin-pannel/Services";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AllPages />} />
          <Route path="/shop" element={<Shoping />} />
          <Route path="/our-blog" element={<Blogs />} />
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="/admin/" element={<DashboardHome />} />
            <Route path="/admin/dashboard" element={<DashboardHome />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/services" element={<Services />} />
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;

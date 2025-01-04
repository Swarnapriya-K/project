import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useContext } from "react";
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
import DashboardHome from "./Pages/Admin-pannel/DashboardHome";
import CheckoutPage from "./Pages/page10-CheckoutPage/CheckoutPage";
import Login from "./Pages/LoginSignup/Login";
import Signup from "./Pages/LoginSignup/Signup";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import UserLayout from "./Pages/components/UserLayout";

import Category from "./Pages/Admin-pannel/Categories";
import Catalog from "./Pages/Admin-pannel/Catalog";
import AddCategoryContainer from "./Pages/Admin-pannel/AddCategoryContainer";
import Products from "./Pages/Admin-pannel/Products";
import AddProductsContainer from "./Pages/Admin-pannel/AddProductsContainer";
const App = () => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080");
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { isLoggedIn, role } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          role === "admin" ? (
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="/admin/" element={<DashboardHome />} />
              <Route path="/admin/dashboard" element={<DashboardHome />} />
              <Route path="/admin/catalog" element={<Catalog />}>
                <Route path="category" element={<Category />} />
                <Route path="products" element={<Products />} />
                {/* <Route
                  path="category/add-category"
                  element={<AddCategoryContainer />}
                /> */}
                {/* <Route
                  path="products/add-product"
                  element={<AddProductContainer />}
                /> */}
              </Route>

              <Route
                path="/admin/category/add-category"
                element={<AddCategoryContainer/>}
              />
              <Route
                path={"/admin/product/add-product"}
                element={<AddProductsContainer/>}
              />
            </Route>
          ) : (
            <>
              <Route element={<UserLayout />}>
                <Route path="/" element={<AllPages />} />
                <Route path="/shop" element={<Shoping />} />
                <Route path="/our-blog" element={<Blogs />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>
            </>
          )
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? (role === "admin" ? "/admin/" : "/") : "/login"}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

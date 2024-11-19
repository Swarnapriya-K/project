import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Home from "./pages/Home";
import "./App.css";
import "../src/pages/MyNavbar.css";
import "../src/page2/Page2.css"
import Sec2home from "./page2/Section";
import Servicepage from "./page3-services/Service-page";
import "../src/page3-services/service.css"
import PackageList from "./page4-packages/PackageList";
import "../src/page4-packages/package.css"
const App = () => {
    return (
        <div className="App">
            <Home/> 
            <Sec2home/>
            <Servicepage/>
            <PackageList/>
        </div>
    );
};

export default App;


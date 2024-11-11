import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Home from "./pages/Home";
import "./App.css";
import "../src/pages/MyNavbar.css";
import "../src/page2/Page2.css"
import Sec2home from "./page2/Section";
const App = () => {
    return (
        <div className="App">
            <Home/> 
            <Sec2home/>
        </div>
    );
};

export default App;


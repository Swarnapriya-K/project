import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';

import Home from "./pages/Home";
import "./App.css";
import "../src/pages/MyNavbar.css";
const App = () => {
    return (
        <div className="App">
            <Home/> 
        </div>
    );
};

export default App;


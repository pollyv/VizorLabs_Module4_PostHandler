import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainContent from "../MainContent/MainContent";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;

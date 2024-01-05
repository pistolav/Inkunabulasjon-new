import './App.css';
import Home from "./pages/home";
import {Navigate, Routes, Route} from "react-router-dom";
import React from "react";
import SimpleCollectionHome from "./pages/SimpleCollectionHome";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/" element={<SimpleCollectionHome/>}/>
                <Route path="/*" element={<Navigate replace to="/"/>}/>
            </Routes>
    </div>
  );
}

export default App;

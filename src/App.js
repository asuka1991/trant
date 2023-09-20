import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Chat from "./components/Chat";
import './App.css'

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
           <Route path="/" element={<Home />} />
           <Route path="chat" element={<Chat />} />
         </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

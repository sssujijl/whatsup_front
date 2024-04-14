/* eslint-disable */

import GlobalFonts from "./fonts/globalFonts";
import Header from "./pages/header";
import Main from "./pages/main";
import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import Map from "./pages/map";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { createPortal } from "react-dom";
import Foodie from "./pages/foodie";
import FoodMate from "./pages/foodmate";
import Places from "./pages/places";
import User from "./pages/user";


function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
    <GlobalFonts/>
    <Header login={login} setLogin={setLogin}/>
    {/* { login && <Login login={login} setLogin={setLogin}/> } */}
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/places" element={<Places/>}/>
      <Route path="/foodie" element={<Foodie/>}/>
      <Route path="/foodMate" element={<FoodMate/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/user" element={<User/>}/>
    </Routes>
    </>
  );
}

export default App;

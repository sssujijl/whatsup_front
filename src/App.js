/* eslint-disable */

import GlobalFonts from "./fonts/globalFonts";
import Header from "./pages/header";
import Main from "./pages/main";
import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import Map from "./pages/map";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Foodie from "./pages/foodie";
import FoodMate from "./pages/foodmate";
import Places from "./pages/places";
import User from "./pages/user";
import CreateFoodie from './pages/createFoodie';
import CreateFoodMate from './pages/createFoodMate';
import ChatRooms from "./pages/chatRooms";
import ChatRoom from "./pages/chatRoom";

function App() {
  return (
    <>
    <GlobalFonts/>
    <Header/>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/places" element={<Places/>}/>
      <Route path="/foodie" element={<Foodie/>}/>
      <Route path="/foodie/create" element={<CreateFoodie/>}/>
      <Route path="/foodMate" element={<FoodMate/>}/>
      <Route path="/foodMate/create" element={<CreateFoodMate/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/chatRooms" element={<ChatRooms/>}/>
      <Route path="/chatRoom/:id" element={<ChatRoom/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='*' element={<h1> 404 없는 페이지임 </h1>}></Route>
    </Routes>
    </>
  );
}

export default App;

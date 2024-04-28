/* eslint-disable */

import GlobalFonts from "./fonts/globalFonts";
import Header from "./pages/layout/header";
import Main from "./pages/layout/main";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Map from "./pages/place/map";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import Foodie from "./pages/post/foodie";
import FoodMate from "./pages/post/foodmate";
import Places from "./pages/place/places";
import User from "./pages/user/user";
import CreateFoodie from "./pages/post/createFoodie";
import CreateFoodMate from "./pages/post/createFoodMate";
import ChatRooms from "./pages/user/chatRooms";
import ChatRoom from "./pages/user/chatRoom";
import Footer from "./pages/layout/footer";
import Post from "./pages/post/post";
import { CheckoutPage } from "./pages/user/userComponent/pointCharge/Checkout";
import { SuccessPage } from "./pages/user/userComponent/pointCharge/Success";
import { FailPage } from "./pages/user/userComponent/pointCharge/Fail";
import { KakaoPay } from "./pages/user/userComponent/pointCharge/Kakao";
import CreateReview from "./pages/place/createReview";
import AdditionalInfoForm from "./pages/GoogleAdditionalInfoForm";

function App() {
  return (
    <>
      <GlobalFonts />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Map />} />

        <Route path="/places">
          <Route index element={<Places />} />
          <Route path=":id/reviews" element={<CreateReview/>}/>
        </Route>

        <Route path="/foodie">
          <Route index element={<Foodie />} />
          <Route path="create" element={<CreateFoodie />} />
          <Route path=":id" element={<Post />} />
        </Route>

        <Route path="/foodMate">
          <Route index element={<FoodMate />} />
          <Route path="create" element={<CreateFoodMate />} />
          <Route path=":id" element={<Post />} />
        </Route>

        <Route path="/chatRoom">
          <Route index element={<ChatRooms />} />
          <Route path=":id" element={<ChatRoom />} />
        </Route>

        <Route path="/user" element={<User />} />
        <Route path="/user/toss" element={<CheckoutPage />} />
        <Route path="/user/toss/success" element={<SuccessPage />} />
        <Route path="/user/toss/fail" element={<FailPage />} />
        <Route path="/user/kakao" element={<KakaoPay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/google" element={<AdditionalInfoForm />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<h1> 404 없는 페이지임 </h1>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

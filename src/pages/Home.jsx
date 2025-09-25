import React, { useEffect } from "react";
import HomeFooter from "../components/HomeFooter";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { useSelector, useDispatch } from "react-redux";


const Home = () => {
  // const user=useSelector(state=>state.auth)
  console.log('inside Home')

  return (
    <div className="">
      <HomeNavbar />
      <Outlet />
      <HomeFooter />
    </div>
  );
};

export default Home;

// useEffect must not return anything besides a function, which is used for clean-up.

// It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

// useEffect(() => {
//   async function fetchData() {
//     // You can await here
//     const response = await MyAPI.getData(someId);
//     // ...
//   }
//   fetchData();
// }, [someId]); // Or [] if effect doesn't need props or state

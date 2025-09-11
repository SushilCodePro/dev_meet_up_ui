import React, { useEffect } from 'react'
import HomeFooter from '../components/HomeFooter'
import {Outlet} from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { fetchProfile } from '../api/api';
import { addUser, clearUser } from '../redux/userSlice';

const Home = () => {
  const user=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const getProfile = async () => {
    try {
      const res = await fetchProfile();
      console.log("getting profile", res.data); 
      dispatch(addUser(res.data));
    } catch (error) {
      console.log("error in getting profile", error);
      dispatch(clearUser())

        // if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        // }     
    }
  };

  getProfile();
}, [navigate, dispatch]);


  return (
    <div className="">
        <HomeNavbar />
        <Outlet/>
        <HomeFooter/>
    </div>
  )
}

export default Home

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
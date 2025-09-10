import React, { useEffect } from 'react'
import HomeFooter from '../components/HomeFooter'
import {Outlet} from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { fetchProfile } from '../api/api';

const Home = () => {
  const user=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  // const fetchProfile=async ()=>{
  //   try {
  //     const res=axios.get('http://localhost:3000/user/profile/view/',{withCredentials:true});
  //   } catch (error) {
  //     console.log('error in getting profile',error);
  //     naviagte('/login');
  //   }
  // }

useEffect(() => {
  const getProfile = async () => {
    try {
      const res = await fetchProfile();
      console.log("getting profile", res.data); // axios stores response in .data
    } catch (error) {
      console.log("error in getting profile", error);
      naviagte('/login')
    }
  };

  getProfile();
}, []);


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
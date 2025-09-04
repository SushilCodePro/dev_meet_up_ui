import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import Login from '../components/Login'
import HomeFooter from '../components/HomeFooter'

const Home = () => {
  return (
    <div className="">
        <HomeNavbar/>
        <Login/>
        <HomeFooter/>
    </div>
  )
}

export default Home
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
// import HomeNavbar from './components/HomeNavbar'
import Profile from "./pages/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />}>
          <Route index element={<Feed />} />          
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login/>} />
        </Route> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} /> {/* protected */}
            <Route path="profile" element={<Profile />} /> {/* protected */}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} /> {/* public */}
      </Routes>
    </Router>
  );
};

export default App;

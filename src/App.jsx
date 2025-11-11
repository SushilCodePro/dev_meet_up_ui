// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
// import HomeNavbar from './components/HomeNavbar'
import Profile from "./pages/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Network from "./pages/Network";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <ProtectedRoute />,  // applies protection
    children: [
      {        
        element: <Home />,  // layout
        children: [
          { path: "feed", element: <Feed /> },
          { path: "profile", element: <Profile /> },
          { path: "network", element: <Network /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

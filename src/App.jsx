import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Network from "./pages/Network";
import Auth from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="network" element={<Network />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../api/api";
import { addUser, clearUser } from "../redux/userSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 🔹 new state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetchProfile();
        console.log("getting profile", res.user);
        dispatch(addUser(res.user));
      } catch (error) {
        console.log("error in getting profile", error);
        dispatch(clearUser());
      } finally {
        setLoading(false); 
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

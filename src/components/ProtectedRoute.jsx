import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../api/api";
import { addUser, clearUser } from "../redux/userSlice";

const ProtectedRoute = () => {
  console.log('inside ProtectedRoute')
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 🔹 new state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log('inside ProtectedRoute useEffect')
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
    console.log('inside ProtectedRoute loading')
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('inside ProtectedRoute auth')
    return <Navigate to="/login" replace />;
  }
   console.log('inside ProtectedRoute before Outlet')
  return <Outlet />;
};

export default ProtectedRoute;

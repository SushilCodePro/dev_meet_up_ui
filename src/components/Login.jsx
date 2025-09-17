import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../api/api.js";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      console.log("login res", data);
      dispatch(addUser(data));
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (emailId && password) {
      mutation.mutate({ emailId, password });
    }
  };

  return (
    <div className="pt-20 pb-10 flex items-center justify-center bg-gray-100">
      <div className="h-[450px] max-w-3xl w-full bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)",
          }}
          aria-label="City view"
        ></div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="flex items-center justify-center mb-6 text-xl font-semibold text-gray-700">
            Login to your account
          </h2>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <label
                className="flex items-center cursor-pointer select-none"
                htmlFor="rememberMe"
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 rounded-sm accent-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full py-2 mb-4 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
            >
              {mutation.isPending ? "Logging ..." : "Login"}
            </button>
            {mutation.isError && (
              <div className="text-red-600">
                Error Login user: {mutation?.error?.response?.data?.message}
              </div>
            )}
            {mutation.isSuccess && (
              <div className="text-green-600">
                Login user: {mutation?.data?.message}
              </div>
            )}
          </form>

          <button
            type="button"
            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition"
          >
            <svg
              className="w-5 h-4 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M488 261.8c0-15.3-1.4-30.1-4-44.3H249v83.9h134.7c-5.8 31.2-23 57.4-49 75.1v62.3h79.3c46.4-42.7 73.3-105.7 73.3-177z"
              />
              <path
                fill="#34A853"
                d="M249 492c66.2 0 121.8-21.9 162.4-59.6l-79.3-62.3c-22.2 14.9-50.7 23.8-83.1 23.8-63.7 0-117.7-43.1-137-101.2H29.3v63.5C69.9 448.5 153.5 492 249 492z"
              />
              <path
                fill="#FBBC04"
                d="M112 298.7c-7.8-22.6-7.8-47 0-69.6V165.6H29.3c-27.2 54.4-27.2 119.2 0 173.6L112 298.7z"
              />
              <path
                fill="#EA4335"
                d="M249 97.5c35.9 0 68.3 12.4 93.8 36.9l70.2-70.2C371.3 24.1 314.5 0 249 0 153.5 0 69.9 43.5 29.3 108.9l82.8 63.5c19.3-58.1 73.3-101.2 137-101.2z"
              />
            </svg>
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            <a href="#" className="hover:underline">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

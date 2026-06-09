import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/userSlice";
import { logoutAPI } from "../api/api";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutAPI();
      console.log("Logout res: ", res);
      dispatch(clearUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleProfile = () => {
    navigate("profile");
  };

  const handleNetwork = () => {
    navigate("network");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("feed")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            Dev<span className="text-indigo-600">MeetUp</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => navigate("feed")}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer font-medium"
          >
            Discover
          </button>
          <button
            onClick={handleNetwork}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer font-medium"
          >
            Network
          </button>
        </div>

        {/* Avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              alt="Profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="h-9 w-9 rounded-xl object-cover"
            />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-xl border border-gray-100 shadow-lg z-50 mt-2 w-48 p-1.5"
          >
            <li>
              <a
                onClick={handleProfile}
                className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg px-3 py-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
                <span className="ml-auto badge badge-xs badge-primary">New</span>
              </a>
            </li>
            <li>
              <a
                onClick={handleNetwork}
                className="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg px-3 py-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                My Network
              </a>
            </li>
            <div className="my-1 border-t border-gray-100" />
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 rounded-lg px-3 py-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;

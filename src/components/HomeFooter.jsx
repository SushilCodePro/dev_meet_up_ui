import React from "react";

const HomeFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Dev<span className="text-indigo-600">MeetUp</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a className="text-xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">About</a>
            <a className="text-xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">Privacy</a>
            <a className="text-xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">Terms</a>
            <a className="text-xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">Contact</a>
          </div>

          <p className="text-xs text-gray-300">© {new Date().getFullYear()} DevMeetUp</p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;

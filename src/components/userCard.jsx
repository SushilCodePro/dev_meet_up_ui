import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto mt-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300">
      <div className="flex items-center space-x-4">
        {/* Avatar Circle */}
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {user.firstName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1)} {user.lastName}
          </h2>
          <p className="text-gray-600 text-sm">Age: {user.age}</p>
          <p className="text-gray-600 text-sm capitalize">
            Gender: {user.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

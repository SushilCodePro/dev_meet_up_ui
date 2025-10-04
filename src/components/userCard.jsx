import React from "react";

const UserCard = ({
  firstName,
  lastName,
  age,
  gender,
  leftStatus,
  rightStatus,
  handleLeftStatus,
  handleRightStatus,
}) => {
  return (
    <div className="max-w-sm mx-auto mt-6 p-6 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition duration-300">
      {/* Avatar + Info */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {firstName?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {firstName?.charAt(0).toUpperCase() + firstName?.slice(1)} {lastName}
          </h2>
          <p className="text-gray-600 text-sm">Age: {age}</p>
          <p className="text-gray-600 text-sm capitalize">Gender: {gender}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-between mt-5">
        <button
          onClick={handleLeftStatus}
          className="flex-1 mr-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow  cursor-pointer transition"
        >
          {leftStatus}
        </button>
        <button
          onClick={handleRightStatus}
          className="flex-1 ml-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium shadow cursor-pointer   transition"
        >
          {rightStatus}
        </button>
      </div>
    </div>
  );
};

export default UserCard;

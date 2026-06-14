// UserCard.jsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequestAPI } from "../api/api";

const avatarColors = [
  "from-violet-500 to-indigo-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-fuchsia-500 to-purple-500",
];

function getColorClass(name = "") {
  const code = name.charCodeAt(0) || 0;
  return avatarColors[code % avatarColors.length];
}

const UserCard = ({ user }) => {
  const { _id: userId, firstName, lastName, age, gender, photoUrl } = user;
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  const colorClass = getColorClass(firstName);
  const displayName =
    `${firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : ""} ${lastName ?? ""}`.trim();

  const mutation = useMutation({
    mutationFn: ({ status, toUserId }) => sendRequestAPI({ status, toUserId }),
    onSuccess: (_, variables) => {
      // Invalidate both feed and user queries to refresh data
      queryClient.invalidateQueries(["feed"]);
      queryClient.invalidateQueries(["user"]);
      setErrorMessage(null);
    },
    onError: (err) => {
      console.error("Request failed:", err);
      setErrorMessage(err?.response?.data?.message || "Action failed. Please try again.");
      // Clear error after 3 seconds
      setTimeout(() => setErrorMessage(null), 3000);
    },
  });

  const handleAction = (status) => {
    if (mutation.isLoading) return;
    setErrorMessage(null);
    mutation.mutate({ status, toUserId: userId });
  };

  const isPending = mutation.isLoading;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-slate-800/50 transition-all duration-300 overflow-hidden">
      {/* Top accent bar with animation */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${colorClass} group-hover:h-2 transition-all duration-300`} />

      <div className="p-6">
        {/* Avatar + Info row */}
        <div className="flex items-start gap-4">
          <div
            className={`h-14 w-14 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden ${!user.photoUrl ? `bg-gradient-to-br ${colorClass}` : "bg-slate-100 dark:bg-slate-800"}`}
          >
            {photoUrl ? (
              <img src={photoUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate transition-colors">
              {displayName}
            </h2>
            <div className="flex flex-wrap gap-x-3 mt-1">
              {age && (
                <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {age} yrs
                </span>
              )}
              {gender && (
                <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 capitalize transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {gender}
                </span>
              )}
            </div>

            {/* Role badge */}
            <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 transition-colors">
              Developer
            </span>
          </div>
        </div>

        {/* Bio / About */}
        {user.about && (
          <p className="mt-4 text-xs text-gray-600 dark:text-slate-400 line-clamp-2 italic transition-colors">
            "{user.about}"
          </p>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {user.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 capitalize transition-colors"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-700 transition-colors">
                +{user.skills.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-gray-100 dark:border-slate-800 transition-colors" />

        {/* Action Buttons with Loading States */}
        <div className="flex gap-3">
          <button
            onClick={() => handleAction("ignored")}
            disabled={isPending}
            className={`
              flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
              ${isPending
                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed border-transparent"
                : "border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-200 dark:hover:border-red-800/50 hover:text-red-600 dark:hover:text-red-400"
              }
            `}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-3.5 h-3.5 border-2 border-gray-300 dark:border-slate-600 border-t-gray-500 dark:border-t-slate-400 rounded-full animate-spin" />
                <span>Ignoring</span>
              </div>
            ) : (
              "Ignore"
            )}
          </button>

          <button
            onClick={() => handleAction("interested")}
            disabled={isPending}
            className={`
              flex-1 py-2.5 px-3 rounded-xl text-sm font-medium text-white transition-all duration-200 cursor-pointer
              bg-gradient-to-r ${colorClass}
              ${isPending
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90 active:scale-[0.98]"
              }
            `}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending</span>
              </div>
            ) : (
              "Interested"
            )}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-3 text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2 text-center animate-fade-in border border-red-100 dark:border-red-900/50">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;


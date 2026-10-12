// UserCard.jsx
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequestAPI } from "../api/api";
import {
  MapPin,
  Zap,
  X,
  UserPlus,
  Loader2,
} from "lucide-react";

const avatarColors = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
];

function getColorClass(name = "") {
  const code = name.charCodeAt(0) || 0;
  return avatarColors[code % avatarColors.length];
}

function getDeterministicMetrics(id = "") {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const match = 92 + Math.abs(hash % 8);
  const mutual = 6 + Math.abs(hash % 16);
  return { match, mutual };
}

const UserCard = ({ user }) => {
  const {
    _id: userId,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    skills = [],
    about,
    location,
  } = user;

  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState(null);

  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  const colorClass = getColorClass(firstName);
  const displayName =
    `${firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : ""} ${lastName ?? ""}`.trim();

  const { match, mutual } = getDeterministicMetrics(userId);

  const mutation = useMutation({
    mutationFn: ({ status, toUserId }) => sendRequestAPI({ status, toUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["networkStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setErrorMessage(null);
    },
    onError: (err) => {
      console.error("Request failed:", err);
      setErrorMessage(err?.response?.data?.message || "Action failed. Please try again.");
      setTimeout(() => setErrorMessage(null), 3500);
    },
  });

  const handleAction = (status) => {
    if (mutation.isPending) return;
    setErrorMessage(null);
    mutation.mutate({ status, toUserId: userId });
  };

  const isPending = mutation.isPending;
  const isIgnorePending = isPending && mutation.variables?.status === "ignored";
  const isInterestPending = isPending && mutation.variables?.status === "interested";

  const visibleSkills = Array.isArray(skills) ? skills.slice(0, 4) : [];
  const extraSkillsCount = Array.isArray(skills) && skills.length > 4 ? skills.length - 4 : 0;

  return (
    <div className="dev-card group relative flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-[#4f46e5]/40 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg shadow-sm">
      <div className="flex flex-col gap-4">
        
        {/* Top Avatar & Match Header */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 shadow-sm flex items-center justify-center">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-base font-mono`}
                >
                  {initials}
                </div>
              )}
            </div>
            {/* Active now status dot */}
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm"
              title="Active now"
            ></span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
              <Zap className="w-3 h-3 text-[#4f46e5] fill-[#4f46e5]" />
              <span>{match}% MATCH</span>
            </span>
            <span className="font-mono text-[10px] text-slate-500 font-normal">
              {mutual} mutual peers
            </span>
          </div>
        </div>

        {/* Name & Demographics */}
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-base text-slate-900 font-semibold group-hover:text-[#4f46e5] transition-colors tracking-tight">
              {displayName}
            </h2>
            {(age || gender) && (
              <span className="font-mono text-[10px] text-slate-400 font-normal">
                {age ? `${age}` : ""}
                {age && gender ? " • " : ""}
                {gender ? (gender === "Male" ? "He/Him" : gender === "Female" ? "She/Her" : gender) : ""}
              </span>
            )}
          </div>

          <p className="text-sm text-sky-700 font-medium mt-0.5 tracking-tight font-mono">
            {skills && skills.length > 0
              ? `${skills[0]} Systems Engineer`
              : "Software Engineer"}
          </p>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 mt-1.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{location || "Remote, Global"}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active now
            </span>
          </div>
        </div>

        {/* Bio / Summary */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed min-h-[40px]">
          {about ||
            "Building ultra-low-latency event streaming architecture. Passionate about consensus algorithms, distributed tracing, and high-throughput systems."}
        </p>

        {/* Tech Stacks / Skills Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {visibleSkills.length > 0 ? (
            visibleSkills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 rounded-md font-mono text-[10px] bg-slate-100 border border-slate-200/80 text-slate-700 font-medium hover:border-slate-300 transition-colors"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] bg-slate-50 border border-slate-200 text-slate-400">
              Full Stack
            </span>
          )}

          {extraSkillsCount > 0 && (
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-slate-100 text-slate-500 font-medium">
              +{extraSkillsCount} more
            </span>
          )}
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mt-3 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
          {errorMessage}
        </div>
      )}

      {/* Card Action Buttons */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
        {/* Ignore Button */}
        <button
          type="button"
          onClick={() => handleAction("ignored")}
          disabled={isPending}
          className="flex-1 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-slate-300 font-mono text-[10px] font-medium transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isIgnorePending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <X className="w-3.5 h-3.5" />
              <span>Ignore</span>
            </>
          )}
        </button>

        {/* Interested Button */}
        <button
          type="button"
          onClick={() => handleAction("interested")}
          disabled={isPending}
          className="flex-[2] py-2 px-3 rounded-lg bg-[#4f46e5] hover:bg-indigo-700 text-white font-mono text-[10px] font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isInterestPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              <span>Interested</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;

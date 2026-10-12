import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getConnectionStatsAPI } from "../api/api";
import { Users, Send, Inbox, TrendingUp } from "lucide-react";

const NetworkStatsBar = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["networkStats"],
    queryFn: async () => {
      const res = await getConnectionStatsAPI();
      return res.data?.data;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const stats = data || {
    totalConnections: 0,
    totalSent: 0,
    totalReceived: 0,
    acceptanceRate: 0,
  };

  const statItems = [
    {
      label: "Connections",
      value: stats.totalConnections,
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "hover:border-indigo-300 dark:hover:border-indigo-700",
    },
    {
      label: "Pending Sent",
      value: stats.totalSent,
      icon: Send,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "hover:border-amber-300 dark:hover:border-amber-700",
    },
    {
      label: "Received",
      value: stats.totalReceived,
      icon: Inbox,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "hover:border-emerald-300 dark:hover:border-emerald-700",
      highlightBadge: stats.totalReceived > 0,
    },
    {
      label: "Acceptance",
      value: `${stats.acceptanceRate}%`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
      border: "hover:border-purple-300 dark:hover:border-purple-700",
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-1.5">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => navigate("/network")}
            title={`View ${item.label} in My Network`}
            className={`px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs ${item.border} hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer text-left`}
          >
            <div className={`p-1 rounded-md ${item.bg} ${item.color} flex-shrink-0`}>
              <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                {isLoading ? (
                  <span className="inline-block w-4 h-3 bg-slate-200 dark:bg-slate-700 animate-pulse rounded" />
                ) : (
                  item.value
                )}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              {item.highlightBadge && !isLoading && (
                <span className="px-1 py-0.2 text-[9px] font-semibold bg-emerald-500 text-white rounded-full">
                  New
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default NetworkStatsBar;

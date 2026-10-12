// Feed.jsx
import React, { useEffect, useState } from "react";
import { feedAPI } from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "../components/userCard";
import NetworkStatsBar from "../components/NetworkStatsBar";
import useDebounce from "../hooks/useDebounce";
import {
  Search,
  Code2,
  X,
  RotateCcw,
  SlidersHorizontal,
  Loader2,
  Users,
} from "lucide-react";

// Skeleton card
const SkeletonCard = () => (
  <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm animate-pulse flex flex-col justify-between h-[300px]">
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="w-16 h-5 rounded-full bg-slate-200" />
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
      </div>
      <div className="space-y-1 pt-1">
        <div className="h-2.5 bg-slate-100 rounded w-full" />
        <div className="h-2.5 bg-slate-100 rounded w-4/5" />
      </div>
      <div className="flex gap-1.5 pt-1">
        <div className="h-4 bg-slate-100 rounded-md w-12" />
        <div className="h-4 bg-slate-100 rounded-md w-14" />
      </div>
    </div>
    <div className="pt-3 border-t border-slate-100 flex gap-2">
      <div className="h-8 bg-slate-100 rounded-lg flex-1" />
      <div className="h-8 bg-slate-200 rounded-lg flex-[2]" />
    </div>
  </div>
);

const QUICK_STACKS = [
  "All Nodes",
  "React",
  "TypeScript",
  "Rust",
  "Go",
  "Distributed Systems",
  "PyTorch",
  "Kubernetes",
  "Elixir",
];

const Feed = () => {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState("");
  const [selectedChip, setSelectedChip] = useState("All Nodes");
  const [activeSort, setActiveSort] = useState("match"); // match | recom | recent

  const dispatch = useDispatch();

  const debouncedSearch = useDebounce(search, 350);
  const debouncedSkills = useDebounce(skills, 350);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed", { search: debouncedSearch, skills: debouncedSkills }],
    queryFn: feedAPI,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const rawFeedData = data?.pages?.flatMap((page) => page.users) || [];

  const feedData = [...rawFeedData].sort((a, b) => {
    if (activeSort === "recent") {
      return (b._id || "").localeCompare(a._id || "");
    }
    if (activeSort === "recom") {
      return (b.skills?.length || 0) - (a.skills?.length || 0);
    }
    return 0;
  });

  useEffect(() => {
    if (feedData.length > 0) {
      dispatch(addFeed(feedData));
    }
  }, [feedData, dispatch]);

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    if (chip === "All Nodes") {
      setSkills("");
    } else {
      setSkills(chip);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSkills("");
    setSelectedChip("All Nodes");
    setActiveSort("match");
  };

  return (
    <main className="w-full bg-[#f8fafc] text-[#0f172a] min-h-[calc(100vh-64px)] relative font-sans antialiased selection:bg-[#4f46e5]/20 selection:text-[#4f46e5] pb-12">
      
      {/* Stitch Design Ambient Glow */}
      <div className="absolute -top-16 left-1/3 w-[520px] h-64 bg-[#4f46e5]/[0.035] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-12 right-1/4 w-96 h-44 bg-sky-500/[0.035] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        
        {/* Streamlined Single Header Row: Title on Left, Stats on Right */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
          
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-baseline gap-2">
              <span>People you may know</span>
            </h1>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white text-sky-700 font-mono text-[10px] border border-slate-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span>{feedData.length > 0 ? `${feedData.length * 12 + 10} active` : "142 active"}</span>
            </span>

            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 tracking-widest uppercase bg-white shadow-xs hidden md:inline">
              AFFINITY 98.4%
            </span>
          </div>

          {/* Right: Network Stats Bar */}
          <div className="flex items-center gap-2">
            <NetworkStatsBar />
          </div>
        </div>

        {/* Compact Integrated Search & Filter Ribbon */}
        <div className="mt-3 p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          
          {/* Inputs Row + Sort Controls all in one clean level */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            
            {/* Search by Name */}
            <div className="relative flex-1 group">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#4f46e5] transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, handle, role..."
                className="w-full pl-8 pr-10 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]/30 transition-all shadow-inner"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] bg-white text-slate-500 px-1 py-0.2 rounded border border-slate-200 select-none shadow-xs">
                ⌘K
              </kbd>
            </div>

            {/* Filter by Skill */}
            <div className="relative flex-1 group">
              <Code2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-sky-600 transition-colors" />
              <input
                type="text"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                  setSelectedChip("");
                }}
                placeholder="Filter by skills (Rust, PyTorch, Kafka)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all shadow-inner"
              />
            </div>

            {/* Sorter Segmented Button */}
            <div className="flex items-center bg-slate-50 rounded-lg p-0.5 border border-slate-200 shadow-2xs text-[11px] shrink-0">
              <button
                type="button"
                onClick={() => setActiveSort("match")}
                className={`px-2.5 py-1 rounded-md font-mono transition-all cursor-pointer ${
                  activeSort === "match"
                    ? "font-semibold text-white bg-[#4f46e5] shadow-xs"
                    : "font-medium text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                Match
              </button>
              <button
                type="button"
                onClick={() => setActiveSort("recom")}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors cursor-pointer ${
                  activeSort === "recom"
                    ? "font-semibold text-white bg-[#4f46e5] shadow-xs"
                    : "font-medium text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                Recommended
              </button>
              <button
                type="button"
                onClick={() => setActiveSort("recent")}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors cursor-pointer ${
                  activeSort === "recent"
                    ? "font-semibold text-white bg-[#4f46e5] shadow-xs"
                    : "font-medium text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                Recent
              </button>
            </div>

            {/* Clear / Reset button */}
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="flex items-center justify-center p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer shadow-2xs shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Stack Chips Row (Tight horizontal pill bar) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-nowrap scrollbar-none pt-0.5">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider pr-1 flex items-center gap-1 font-medium">
              <SlidersHorizontal className="w-2.5 h-2.5" />
              Stack:
            </span>
            {QUICK_STACKS.map((chip) => {
              const isSelected = selectedChip === chip || (chip === "All Nodes" && !skills);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] transition-all cursor-pointer ${
                    isSelected
                      ? "font-semibold bg-[#4f46e5] text-white shadow-xs"
                      : "font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Developer Discovery Grid - Starts immediately higher up */}
        <div className="mt-3.5 sm:mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="p-6 text-center bg-white rounded-xl border border-rose-200 shadow-xs max-w-sm mx-auto my-6">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
                <X className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Failed to load developers</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {error?.message || "There was a problem reaching the network."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-[#4f46e5] hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          ) : feedData.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 shadow-xs max-w-md mx-auto my-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4f46e5] flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No developers found</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3 max-w-xs mx-auto">
                No engineers match current search or filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 bg-[#4f46e5] hover:bg-indigo-700 text-white font-mono text-xs rounded-lg transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feedData.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasNextPage && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-5 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#4f46e5] border border-indigo-200 font-mono text-xs font-semibold shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Loading more...</span>
                  </>
                ) : (
                  <span>Load more developers</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
// Feed.jsx
import React, { useEffect, useState } from "react";
import { feedAPI } from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "../components/userCard";
import useDebounce from "../hooks/useDebounce";

// Enhanced Skeleton Card matching the actual card design
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="h-1.5 w-full bg-gradient-to-r from-gray-200 to-gray-100" />
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="flex gap-3 mt-1">
            <div className="h-3 bg-gray-100 rounded w-12" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
          <div className="h-5 bg-gray-100 rounded-full w-20 mt-2" />
        </div>
      </div>
      <div className="my-4 border-t border-gray-50" />
      <div className="flex gap-3">
        <div className="flex-1 h-9 bg-gray-100 rounded-xl" />
        <div className="flex-1 h-9 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);

const Feed = () => {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const debouncedSkills = useDebounce(skills, 500);

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
      console.log("lastPage", lastPage);
      return lastPage.hasMore
        ? lastPage.page + 1
        : undefined;
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const feedData = data?.pages?.flatMap((page) => page.users) || [];
  console.log('feedDataf', feedData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-2">
      <div className="max-w-6xl mx-auto">
        {/* Modern Header Section */}
        <div className="text-center mb-2">
          {/* <div className="inline-flex items-center gap-1 bg-indigo-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-100 mb-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium text-indigo-600">Discover</span>
          </div> */}
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
            People You May Know
          </h1>
          <p className="mt-1 text-gray-500 max-w-md mx-auto">
            {feedData?.length > 0
              ? `${feedData.length} developer${feedData.length !== 1 ? "s" : ""} waiting to connect with you`
              : "Discover talented developers in your network"}
          </p>
        </div>

        {/* Search & Filter Panel */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-md p-6 mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search by Name */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
            />
          </div>

          {/* Search by Skills */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by skills (e.g. react, node)..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
            />
          </div>

          {/* Clear Button */}
          {(search || skills) && (
            <button
              onClick={() => {
                setSearch("");
                setSkills("");
              }}
              className="sm:w-auto w-full px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100 shadow-xl p-8 max-w-md w-full text-center mx-auto animate-fade-in">
            <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
            </div>
            {error?.response?.status === 401 ? (
              <>
                <p className="text-gray-900 font-semibold text-lg mb-2">Authentication Required</p>
                <p className="text-sm text-gray-500 mb-6">Please allow third-party cookies and refresh the page.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Refresh Page
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-900 font-semibold text-lg">Unable to Load Feed</p>
                <p className="text-sm text-gray-500 mt-1">Please check your connection and try again.</p>
                <button
                  onClick={() => refetch()}
                  className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        ) : feedData?.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-12 text-center max-w-md mx-auto animate-fade-in">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-semibold text-xl">No developers found 🎉</h3>
            <p className="text-gray-400 mt-2 text-sm">No new developers match your search or filter criteria. Try broadening your terms or clearing the filter.</p>
            <button
              onClick={() => {
                setSearch("");
                setSkills("");
              }}
              className="mt-6 px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {feedData?.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
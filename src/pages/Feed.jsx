// Feed.jsx
import React, { useEffect } from "react";
import { feedAPI } from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "../components/userCard";

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
    queryKey: ["feed"],

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
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-9 bg-gray-200 rounded-lg w-72 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-56 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    const isCookieIssue = error?.response?.status === 401;
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100 shadow-xl p-8 max-w-md w-full text-center">
          <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </div>
          {isCookieIssue ? (
            <>
              <p className="text-gray-900 font-semibold text-lg mb-2">Authentication Required</p>
              <p className="text-sm text-gray-500 mb-6">Please allow third-party cookies and refresh the page.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
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
                className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Modern Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-100 mb-4">
            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium text-indigo-600">Discover</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
            People You May Know
          </h1>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            {feedData?.length > 0
              ? `${feedData.length} developer${feedData.length !== 1 ? "s" : ""} waiting to connect with you`
              : "Discover talented developers in your network"}
          </p>
        </div>
        {hasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="
        px-6
        py-3
        rounded-xl
        bg-indigo-600
        text-white
        font-medium
        hover:bg-indigo-700
        disabled:opacity-50
      "
            >
              {isFetchingNextPage
                ? "Loading..."
                : "Load More"}
            </button>
          </div>
        )}

        {/* Feed Grid or Empty State */}
        {feedData?.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-12 text-center max-w-md mx-auto">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-semibold text-xl">All caught up! 🎉</h3>
            <p className="text-gray-400 mt-2 text-sm">No new developers to discover right now. Check back later for more connections.</p>
            <button
              onClick={() => refetch()}
              className="mt-6 px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedData?.map((user) => (
              <UserCard
                key={user._id}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default Feed;
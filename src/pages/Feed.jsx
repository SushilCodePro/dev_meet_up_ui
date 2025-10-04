import React, { useEffect } from "react";
import { feedAPI, sendRequestAPI } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "../components/userCard";

const Feed = () => {
  const { data: feedData } = useSelector((state) => state.feed.value);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["feed"],
    queryFn: feedAPI,
  });

  useEffect(() => {
    if (data) {
      dispatch(addFeed(data));
      console.log("feed Data:", data);
    }
    if (isError) {
      console.error("feed error:", error);
    }
  }, [data, isError]);

  const userMutation = useMutation({
    mutationFn: sendRequestAPI,
    onSuccess: (res, variables) => {
      console.log("user success", res);
      queryClient.invalidateQueries(["feed"]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      console.error("Ignore failed", err);
    },
  });

  const handleIgnore = (userId) => {
    userMutation.mutate({ status: "ignored", toUserId: userId });
  };
  const handleInterested = (userId) => {
    userMutation.mutate({ status: "interested", toUserId: userId });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-blue-500 w-10 h-10"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500 font-medium py-6">Failed to load feed</p>;
  }

  return (
    <div className="container mx-auto px-2 py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        People You May Know
      </h1>

      {feedData?.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {feedData?.map((user) => (
            <UserCard
              key={user._id}
              firstName={user?.firstName}
              lastName={user?.lastName}
              age={user?.age}
              gender={user?.gender}
              leftStatus="Ignore"
              rightStatus="Interested"
              handleLeftStatus={() => handleIgnore(user._id)}
              handleRightStatus={() => handleInterested(user._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;

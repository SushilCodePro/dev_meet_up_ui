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
      // dispatch(removeUserFromFeed(variables.toUserId));
      // or refetch query if you want fresh data from backend
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
    return <span className="loading loading-spinner text-neutral"></span>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load feed</p>;
  }

  return (
    <div>
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
  );
};

export default Feed;

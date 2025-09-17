import React, { useEffect } from "react";
import { feedAPI, ignoreUserAPI } from "../api/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "../components/userCard";

const Feed = () => {
  const { data: feedData } = useSelector((state) => state.feed.value);
  console.log("feedata", feedData);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feed"],
    queryFn: feedAPI,
    // onSuccess: (data) => {
    //   console.log("Feed fetched:", data);
    //   dispatch(addFeed(data));
    // },
    // onError: (error) => {
    //   console.error("Failed to fetch Feed:", error);
    // },
  });

  if (data) {
    dispatch(addFeed(data));
  }

  if (isLoading) {
    return <span className="loading loading-spinner text-neutral"></span>;
  }

  const ignoreMutation = useMutation({
    mutationFn: ignoreUserAPI,
    onSuccess: (res, variables) => {
      console.log("Ignore success", res);
      // dispatch(removeUserFromFeed(variables.toUserId)); // remove locally
    },
    onError: (err) => {
      console.error("Ignore failed", err);
    },
  });

  const handleIgnore = (userId) => {
    ignoreMutation.mutate({ status: "ignored", toUserId: userId });
  };

  console.log("feed data", data);
  return (
    <div>
      {feedData &&
        feedData.map((user) => (
          <UserCard user={user} key={user._id} handleIgnore={handleIgnore} />
        ))}
    </div>
  );
};

export default Feed;

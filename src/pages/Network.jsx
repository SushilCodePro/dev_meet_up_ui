import { gotRequestAPI, recievedRequestAPI, myConnectionAPI } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserCard from "../components/userCard";

const Network = () => {
  const {
    data: requestData,
    isLoading: isRequestLoading,
    isError: isRequestError,
    error: requestError,
  } = useQuery({
    queryKey: ["request"],
    queryFn: gotRequestAPI,
  });

  const {
    data: connectionData,
    isLoading: isConnectionLoading,
    isError: isConnectionError,
    error: connectionError,
  } = useQuery({
    queryKey: ["connection"],
    queryFn: myConnectionAPI,
  });
  console.log("got request: ", requestData);
  const queryClient = useQueryClient();

  const gotRequestMutation = useMutation({
    mutationFn: recievedRequestAPI,
    onSuccess: (res) => {
      console.log("recieved Request res: ", res);
      queryClient.invalidateQueries(["connection"]);
    },
  });
console.log("my connection: ", connectionData);
  const handleAccept = (userId) => {
    console.log("accprt req id", userId)
    gotRequestMutation.mutate({ status: "accepted", requestedId: userId });
  };
  const handleReject = (userId) => {
    gotRequestMutation.mutate({ status: "interested", requestedId: userId });
  };

  if (isRequestLoading && isConnectionLoading) {
    return <p>Loading...</p>;
  }

   if (isRequestError) return <p>Error: {requestError.message}</p>;

//   if (requestData?.data?.length === 0) {
//     return <p>No connection requests found</p>;
//   }

//   if (isRequestError) {
//     return <p>Error in Request API: {requestError.message}</p>;
//   }

//   if (isConnectionError) {
//     return <p>Error in Connection API: {connectionError.message}</p>;
//   }
  return (
    <div>
      {(requestData?.data?.length === 0) ? <p>No requests found</p> :requestData?.data &&
        requestData?.data.map((request) => (
          <UserCard
            key={request._id}
            firstName={request?.fromUserId?.firstName}
            lastName={request?.fromUserId?.lastName}
            age={request?.fromUserId?.age}
            gender={request?.fromUserId?.gender}
            leftStatus="Accept"
            rightStatus="Reject"
            handleLeftStatus={() => handleAccept(request._id)}
            handleRightStatus={() => handleReject(request._id)}
          />
        ))}
      <div>
        <p>My connections</p>
        {connectionData&& connectionData.data.map((user)=>(
            <div key={user._id} className="bg-gray-300 rounded-md mb-2 shadow-2xl">
                <p>Name: {user?.fromUserId?.firstName}  </p>
                <p>Age : {user?.fromUserId?.age} </p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Network;

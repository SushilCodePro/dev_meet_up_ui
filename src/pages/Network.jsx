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

  const queryClient = useQueryClient();

  const gotRequestMutation = useMutation({
    mutationFn: recievedRequestAPI,
    onSuccess: (res) => {
      console.log("recieved Request res: ", res);
      queryClient.invalidateQueries(["connection"]);
    },
  });

  const handleAccept = (userId) => {
    gotRequestMutation.mutate({ status: "accepted", requestedId: userId });
  };

  const handleReject = (userId) => {
    gotRequestMutation.mutate({ status: "interested", requestedId: userId });
  };

  if (isRequestLoading || isConnectionLoading) {
    return <p className="text-center py-8 text-gray-600">Loading...</p>;
  }

  if (isRequestError) return <p>Error: {requestError.message}</p>;
  if (isConnectionError) return <p>Error: {connectionError.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Network</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requests Section */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Connection Requests
          </h2>

          {requestData?.data?.length === 0 ? (
            <p className="text-gray-500">No requests found</p>
          ) : (
            <div className="space-y-4">
              {requestData?.data?.map((request) => (
                <UserCard
                  key={request._id}
                  firstName={request?.fromUserId?.firstName}
                  lastName={request?.fromUserId?.lastName}
                  age={request?.fromUserId?.age}
                  gender={request?.fromUserId?.gender}
                  leftStatus="Reject"
                  rightStatus="Accept"
                  handleLeftStatus={() => handleReject(request._id)}
                  handleRightStatus={()=> handleAccept(request._id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Connections Section */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            My Connections
          </h2>

          {connectionData?.data?.length === 0 ? (
            <p className="text-gray-500">No connections yet</p>
          ) : (
            <div className="space-y-4">
              {connectionData?.data?.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition"
                >
                  <p className="text-lg font-medium text-gray-800">
                    {user?.fromUserId?.firstName} {user?.fromUserId?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Age: {user?.fromUserId?.age} | {user?.fromUserId?.gender.charAt(0).toUpperCase()} 
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Network;

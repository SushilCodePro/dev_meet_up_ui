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
    gotRequestMutation.mutate({ status: "rejected", requestedId: userId });
  };

  if (isRequestLoading || isConnectionLoading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors"><p className="text-gray-600 dark:text-slate-400">Loading...</p></div>;
  }

  if (isRequestError) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8"><p className="text-red-500">Error: {requestError.message}</p></div>;
  if (isConnectionError) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8"><p className="text-red-500">Error: {connectionError.message}</p></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white transition-colors">My Network</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requests Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-5 transition-colors">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 text-slate-800 dark:text-slate-200 transition-colors">
              Connection Requests
            </h2>

            {requestData?.data?.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No requests found</p>
            ) : (
              <div className="space-y-4">
                {requestData?.data?.map((request) => (
                  <UserCard
                    key={request._id}
                    user={request.fromUserId}
                    leftStatus="rejected"
                    rightStatus="accepted"
                    handleLeftStatus={() => handleReject(request._id)}
                    handleRightStatus={() => handleAccept(request._id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Connections Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-5 transition-colors">
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 text-slate-800 dark:text-slate-200 transition-colors">
              My Connections
            </h2>

            {connectionData?.data?.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No connections yet</p>
            ) : (
              <div className="space-y-4">
                {connectionData?.data?.map((user) => (
                  <div
                    key={user._id}
                    className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {user?.fromUserId?.firstName?.charAt(0)}{user?.fromUserId?.lastName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                          {user?.fromUserId?.firstName} {user?.fromUserId?.lastName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Age: {user?.fromUserId?.age} | {user?.fromUserId?.gender?.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;

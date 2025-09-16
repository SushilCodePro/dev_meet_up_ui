import React, { useEffect } from 'react'
import { feedAPI } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import { useSelector,useDispatch } from 'react-redux'
import { addFeed } from '../redux/feedSlice'
import UserCard from '../components/userCard'

const Feed = () => {
  const {data:feedData}=useSelector(state=>state.feed.value);
  console.log('feedata',feedData);
  const dispatch=useDispatch();

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
  if(data){
    dispatch(addFeed(data));
  }

  if (isLoading) {
    return <span className="loading loading-spinner text-neutral"></span>
  }

  console.log("feed data", data);
  return (
    <div>
      {feedData && feedData.map(user=>(
        <UserCard user={user} key={user._id}/>
      ))}
    </div>
  )
}

export default Feed
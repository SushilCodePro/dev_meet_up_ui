import React, { useEffect } from 'react'
import { feedAPI } from '../api/api'
import { useQuery } from '@tanstack/react-query'

const Feed = () => {

    const { data, isLoading, isError } = useQuery({
      queryKey: ["feed"],
      queryFn: feedAPI,
      onSuccess: (data) => {
        console.log("Feed fetched:", data);
      },
      onError: (error) => {
        console.error("Failed to fetch Feed:", error);
      },
    });
  return (
    <div>Feed</div>
  )
}

export default Feed
import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data,{withCredentials:true});
export const signupAPI= (data)=>apiClient.post('/user/auth/signup',data);
export const fetchProfile =()=>apiClient.get('/user/profile/view/',{withCredentials:true});
export const logoutAPI =()=>apiClient.get('/user/auth/logout/',{withCredentials:true});

export const feedAPI = async ({ pageParam = 1, queryKey }) => {
  const filterParams = queryKey?.[1] || {};
  const { search = "", skills = "" } = filterParams;
  const res = await apiClient.get(
    `/user/feed?page=${pageParam}&limit=9&search=${encodeURIComponent(search)}&skills=${encodeURIComponent(skills)}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const profileUpdateAPI =(data)=>apiClient.post('/user/profile/update/',data,{withCredentials:true});
export const uploadPhotoAPI =(data)=>apiClient.post('/user/profile/upload-photo',data,{
  withCredentials:true, 
  headers: { "Content-Type": "multipart/form-data" }
});
export const sendRequestAPI = ({ status, toUserId }) => apiClient.post(`/user/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
export const recievedRequestAPI = ({ status, requestedId }) => apiClient.post(`/user/request/receive/${status}/${requestedId}`, {}, { withCredentials: true });
export const gotRequestAPI =()=>apiClient.get('/user/request/recieved/',{withCredentials:true});
export const myConnectionAPI =()=>apiClient.get('/user/request/connection/',{withCredentials:true});

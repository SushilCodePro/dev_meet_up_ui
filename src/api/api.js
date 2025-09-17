import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data,{withCredentials:true});
export const fetchProfile =()=>apiClient.get('http://localhost:3000/user/profile/view/',{withCredentials:true});
export const logoutAPI =()=>apiClient.get('http://localhost:3000/user/auth/logout/',{withCredentials:true});
export const feedAPI =()=>apiClient.get('http://localhost:3000/user/feed/',{withCredentials:true});
export const profileUpdateAPI =(data)=>apiClient.post('http://localhost:3000/user/profile/update/',data,{withCredentials:true});
export const ignoreUserAPI = ({ status, toUserId }) => apiClient.post(`/user/request/send/${status}/${toUserId}`, {}, { withCredentials: true });


import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data,{withCredentials:true});
export const fetchProfile =()=>apiClient.get('http://localhost:3000/user/profile/view/',{withCredentials:true});
export const logoutAPI =()=>apiClient.get('http://localhost:3000/user/auth/logout/',{withCredentials:true});
export const feedAPI =()=>apiClient.get('http://localhost:3000/user/feed/',{withCredentials:true});

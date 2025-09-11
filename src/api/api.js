import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data,{withCredentials:true});
export const fetchProfile =()=>apiClient.get('http://localhost:3000/user/profile/view/',{withCredentials:true});

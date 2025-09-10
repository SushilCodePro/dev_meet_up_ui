import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data,{withCredentials:true});

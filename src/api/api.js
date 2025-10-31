import apiClient from "./httpClient";

export const loginAPI= (data)=>apiClient.post('/user/auth/signin',data);
export const signupAPI= (data)=>apiClient.post('/user/auth/signup',data);
export const fetchProfile =()=>apiClient.get('/user/profile/view/');
export const logoutAPI =()=>apiClient.get('/user/auth/logout/');
export const feedAPI =()=>apiClient.get('/user/feed/');
export const profileUpdateAPI =(data)=>apiClient.post('/user/profile/update/',data);
export const sendRequestAPI = ({ status, toUserId }) => apiClient.post(`/user/request/send/${status}/${toUserId}`, {});
export const recievedRequestAPI = ({ status, requestedId }) => apiClient.post(`/user/request/receive/${status}/${requestedId}`, {});
export const gotRequestAPI =()=>apiClient.get('/user/request/recieved/');
export const myConnectionAPI =()=>apiClient.get('/user/request/connection/');

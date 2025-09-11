import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        clearUser:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
        }
    }
})

export const {addUser,clearUser}=userSlice.actions;
export default userSlice.reducer;

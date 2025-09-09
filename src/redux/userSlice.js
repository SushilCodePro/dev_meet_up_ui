import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name:'',
    initialState:null,
    reducers:{
        addUser:(state,action)=>{

        }
    }
})

export const {addUser}=userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


export const userSlice=createSlice({
    name:'auth',
    initialState:{
        data:null,
    },
    reducers:{
        addUser:(state,action)=>{
            state.data=action.payload;
        }
    }
})

export const {addUser}=userSlice.actions;
export default userSlice.reducer;

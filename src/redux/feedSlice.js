import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name:'feed',
    initialState:{
        value:[]
    },
    reducers:{
        addFeed:(state, action)=>{
            state.value=action.payload;
        }
    }
})

export const {addFeed}=feedSlice.actions;
export default feedSlice.reducer;
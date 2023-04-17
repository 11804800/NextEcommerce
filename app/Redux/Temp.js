import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}

const TempSlice=createSlice({
    name:"Temp",
    initialState,
    reducers:{
        showTemp:(state,action)=>{
            state.value=action.payload
        },
    },
});


export {TempSlice};
export const {showTemp}=TempSlice.actions;
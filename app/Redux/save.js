import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}

const SaveSlice=createSlice({
    name:"save",
    initialState,
    reducers:{
        showSave:(state,action)=>{
            state.value=action.payload
        },
        postSave:(state,action)=>{
            state.value.push(action.payload)
        },
    }
});

export {SaveSlice};
export const {showSave,postSave}=SaveSlice.actions;
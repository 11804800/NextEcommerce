import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[],
}

const CommentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        showComments:(state,action)=>{
            state.value=action.payload
        },
        PostComments:(state,action)=>{
            state.value.push(action.payload)
        },
    },
});

export  {CommentSlice};
export const {showComments,PostComments}=CommentSlice.actions;

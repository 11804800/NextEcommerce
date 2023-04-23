import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuth:localStorage.getItem('token')? true:false,
}

const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        Auth:(state,action)=>{
            state.isAuth=localStorage.getItem('token')? true:false
        }
    },
});

export {AuthSlice};
export const {Auth} =AuthSlice.actions;
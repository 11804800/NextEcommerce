import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuth:localStorage.getItem('token')? true:false,
    creds:localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null
}

const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        Auth:(state,action)=>{
            state.isAuth=localStorage.getItem('token')? true:false
        },
        users:(state,action)=>{
            state.creds=localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null
        }
    },
});

export {AuthSlice};
export const {Auth,users} =AuthSlice.actions;
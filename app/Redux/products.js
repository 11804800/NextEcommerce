"use client";
import { createSlice } from '@reduxjs/toolkit';

const initialState={
    value:[],
    All:[]
}

const ProductSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        showProduct:(state,action)=>{
            state.value = action.payload
        },
        showProducts:(state,action)=>{
            state.All=action.payload
        }
    },
});

export {ProductSlice};
export const {showProduct,showProducts}=ProductSlice.actions;
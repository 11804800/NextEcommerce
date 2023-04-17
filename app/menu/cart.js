import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}

const CartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        showCart:(state,action)=>{
            state.value=action.payload
        },
        addCart:(state,action)=>{
            state.value.push(action.payload)
        }
    },
});

export {CartSlice};
export const {showCart,addCart,increaseQuan}=CartSlice.actions;
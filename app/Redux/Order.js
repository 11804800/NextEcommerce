import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:[]
}

const OrderSlice=createSlice({
    name:"Temp",
    initialState,
    reducers:{
        showOrder:(state,action)=>{
            state.value=action.payload
        },
        postOrder:(state,action)=>{
            state.value.push(action.payload)
        },
    },
});

export {OrderSlice};
export const {showOrder,postOrder}=OrderSlice.actions;
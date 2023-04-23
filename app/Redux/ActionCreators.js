"use client";
import { configureStore } from "@reduxjs/toolkit";
import { CommentSlice } from "../menu/comments";
import { ProductSlice } from "./products";
import { CartSlice } from "../menu/cart";
import { SaveSlice } from "./save";
import { OrderSlice } from "./Order";
import { TempSlice } from "./Temp";

const store=configureStore({
    reducer:{
        product:ProductSlice.reducer,
        comment:CommentSlice.reducer,
        cart:CartSlice.reducer,
        save:SaveSlice.reducer,
        temp:TempSlice.reducer,
        order:OrderSlice.reducer
    }
});

export default store;
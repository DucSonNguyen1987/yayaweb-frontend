import { createSlice } from "@reduxjs/toolkit";

const intitialState ={
    value: {product: []},
};


export const cartSlice = createSlice({
    name :'user',
    initialState,
    reducers: {
        addToCart : (state,action)=>{

        },
        removeFromCart : (state,action)=>{

        },
    },

});

export const { addToCart, removeFromCart}= cartSlice.actions;
export default cartSlice.reducer;
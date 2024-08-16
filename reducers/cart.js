import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value: {
        items: [],
        total: 0,
    },
};


export const cartSlice = createSlice({
    name :'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const foundIndex = state.value.items.findIndex(item => item.product.id === action.payload.product.id && item.product.options.volume == action.payload.product.volume);
            if(foundIndex !== -1) {
                state.value.items[foundIndex].quantity += action.payload.quantity
            } else {
                state.value.items.push(action.payload);
            }
            state.value.total = state.value.items.reduce((acc, item) => { return acc + (item.product.price * item.quantity) }, 0);
        },
        removeFromCart : (state, action)=>{
            state.value.items = state.value.items.filter(item => item.product.id !== action.payload);
            state.value.total = state.value.items.reduce((acc, item) => { return acc + (item.product.price * item.quantity) }, 0);
        },
    },

});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
            const foundIndex = state.value.items.findIndex(item => item.product.productId === action.payload.product.productId && item.product.options.volume.capacity === action.payload.product.options.volume.capacity);
            if(foundIndex !== -1) {
                state.value.items[foundIndex].quantity += action.payload.quantity
            } else {
                state.value.items.push(action.payload);
            }
            state.value.total = state.value.items.reduce((acc, item) => { return (acc + ((item.product.price+item.product.options.volume.price) * item.quantity)).toFixed(2) }, 0);
        },
        removeFromCart : (state, action) => {
            const items = state.value.items;
            state.value.items = state.value.items.filter(item => item.product.productId !== action.payload.productId || item.product.options.volume.capacity !== action.payload.options.volume.capacity);
            state.value.total = state.value.items.reduce((acc, item) => { return acc + ((item.product.price+item.product.options.volume.price) * item.quantity) }, 0);
        },
    },
  },
);

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

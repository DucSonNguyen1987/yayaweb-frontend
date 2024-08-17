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
            console.log(action.payload);
            const foundIndex = state.value.items.findIndex(item => item.product.productId === action.payload.product.productId && item.product.options.volume.capacity === action.payload.product.options.volume.capacity);
            if(foundIndex !== -1) {
                state.value.items[foundIndex].quantity += action.payload.quantity
            } else {
                state.value.items.push(action.payload);
            }
            state.value.total = state.value.items.reduce((acc, item) => { return acc + ((item.product.price+item.product.options.volume.price) * item.quantity) }, 0);
        },
        removeFromCart : (state, action) => {
            console.log('removeFromCart', action.payload.productId, action.payload.options.volume.capacity);
            const items = state.value.items;
            console.log('items', items);
            console.log('removeFromCart2', state.value.items.filter(item => {
                return item.product.productId !== action.payload.productId && item.product.options.volume.capacity !== action.payload.options.volume.capacity;
            }));
            state.value.items = state.value.items.filter(item => item.product.productId !== action.payload.productId || item.product.options.volume.capacity !== action.payload.options.volume.capacity);
            state.value.total = state.value.items.reduce((acc, item) => { return acc + ((item.product.price+item.product.options.volume.price) * item.quantity) }, 0);
        },
    },

});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
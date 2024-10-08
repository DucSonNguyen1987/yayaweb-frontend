import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    items: [],
    deliveryDate: null,
    deliveryTime: null,
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
            state.value.total = state.value.items.reduce((acc, item) => { return (acc + ((item.product.price * item.product.options.volume.priceMultiplier) * item.quantity)) }, 0);
        },
        removeFromCart : (state, action) => {
            const items = state.value.items;
            state.value.items = state.value.items.filter(item => item.product.productId !== action.payload.productId || item.product.options.volume.capacity !== action.payload.options.volume.capacity);
            state.value.total = state.value.items.reduce((acc, item) => { return acc + ((item.product.price * item.product.options.volume.priceMultiplier) * item.quantity) }, 0);
        },
        updateDeliveryDate: (state, action) => {
          state.value.deliveryDate = action.payload;
        },
        updateDeliveryTime: (state, action) => {
          state.value.deliveryTime = action.payload;
        }
    },
  },
);

export const { addToCart, removeFromCart, updateDeliveryDate, updateDeliveryTime } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { productId : null, composition : [], createdBy: null, price: null }
}

export const  myJuiceSlice = createSlice ({
    name :"myJuice",
    initialState,
    reducers : {
        saveMyJuice: (state, action)=>{
            state.value.productId = action.payload.productId;
            state.value.composition = action.payload.composition;
            state.value.createdBy = action.payload.createdBy;
            state.value.price = action.payload.price;
        },

        forgetMyJuice : (state)=>{
            state.value.productId= null;
            state.value.composition = [];
            state.value.createdBy = null;
            state.value.price = null;
        },
    }
});

export const { saveMyJuice, forgetMyJuice} = myJuiceSlice.actions;
export default myJuiceSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { recipe : [], createdBy: null, price: null }
}

export const  myJuiceSlice = createSlice ({
    name :"myJuice",
    initialState,
    reducers : {
        saveMyJuice: (state, action)=>{
            state.value.recipe = action.payload.recipe;
            state.value.createdBy = action.payload.createdBy;
            state.value.price = action.payload.price;
        },

        forgetMyJuice : (state)=>{
            state.value.recipe = [];
            state.value.createdBy = null;
            state.value.price = null;
        },
    }
});

export const { saveMyJuice, forgetMyJuice} = myJuiceSlice.actions;
export default myJuiceSlice.reducer;
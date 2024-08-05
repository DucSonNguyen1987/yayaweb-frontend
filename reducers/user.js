import {creatSlice} from '@reduxjs/toolkit';

const initialState = {
    value : { token : null, mail: null},
};

export const userSlice = creatSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action) =>{
            state.value.token = action.payload.token;
            state.value.mail = action.payload.mail;
        },
        logout : (state) =>{
            state.value.token = null;
            state.value.mail = null;
        },
    },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
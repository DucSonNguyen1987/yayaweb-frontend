import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { gender:null, firstName: null, lastName: null, phoneNumber: null, email: null, age :null, accessToken :null, refreshToken :null, address: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.value.accessToken = action.payload.data.accessToken;
      state.value.email = action.payload.email;
      state.value.gender = action.payload.data.gender;
      state.value.firstName = action.payload.data.firstName;
      state.value.lastName = action.payload.data.lastName;
      state.value.phoneNumber = action.payload.data.phoneNumber;
      state.value.age = action.payload.data.age;
      state.value.address = action.payload.data.address;
      state.value.refreshToken = action.payload.data.refreshToken;



    },
    logout: (state) => {
      state.value.accessToken = null;
      state.value.email = null;
      state.value.gender = null;
      state.value.firstName = null;
      state.value.lastName = null;
      state.value.phoneNumber = null;
      state.value.age = null;
      state.value.address = [];
      state.value.refreshToken = null;
    },
  },
  
});

export const { login, logout, signUp } = userSlice.actions;
export default userSlice.reducer;

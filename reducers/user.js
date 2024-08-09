import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { gender:null, firstName: null, lastName: null, phoneNumber: null, email: null, age :null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
  },
  signUp: (state, action)=>{
    state.value.gender = action.payload.gender;
    state.value.firstName = action.payload.firstName;
    state.value.lastName = action.payload.lastName;
    state.value.age = action.payload.age;
    state.value.phoneNumber = action.payload.phoneNumber;
    state.value.email = action.payload.email;
    state.value.password = action.payload.password;
    
  }
});

export const { login, logout, signUp } = userSlice.actions;
export default userSlice.reducer;

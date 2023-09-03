import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user: ""
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    logout: (state, action) => {
      state.user.isauthenticated = action.payload.isauthenticated
      const logoutItem = state.user 
      localStorage.setItem("user", JSON.stringify(logoutItem))
    },
    getUserData: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'));
    }
    
  },
});

export const { login, logout, getUserData } = authSlice.actions;

export default authSlice.reducer;

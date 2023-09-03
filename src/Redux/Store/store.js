import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice';
import dataReducer from '../Features/Data/dataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});

export default store;

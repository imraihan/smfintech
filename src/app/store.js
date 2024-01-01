import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import customerReducer from '../features/customerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer
  },
});

export default store;
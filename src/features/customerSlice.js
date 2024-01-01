import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    editCustomer: (state, action) => {
      const { index, updatedCustomer } = action.payload;
      state.customers[index] = updatedCustomer;
    },
    deleteCustomer: (state, action) => {
      const index = action.payload;
      state.customers.splice(index, 1);
    },
    addCustomersFromExcel: (state, action) => {
      state.customers.push(...action.payload);
    },
  },
});

export const { addCustomer, editCustomer, deleteCustomer, addCustomersFromExcel } = customerSlice.actions;

export const selectCustomers = (state) => state.customer.customers;

export default customerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'savedData',
  initialState: {
    pay: 1,
    payda: 10,
  },
  reducers: {
    saveData: (state, action) => {
      localStorage.setItem('kesir', JSON.stringify(action.payload));
      state.pay = action.payload.pay;
      state.payda = action.payload.payda;
    },
    getData: (state) => {
      const myData = localStorage.getItem('kesir');
      if (myData) {
        const parsedData = JSON.parse(myData);
        state.pay = parsedData.pay;
        state.payda = parsedData.payda;
      }
    },
  },
});

export const { saveData, getData } = dataSlice.actions;

export default dataSlice.reducer;

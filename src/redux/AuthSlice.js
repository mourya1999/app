import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phoneNumber: '', 
  role:'',
  token:''
};

const phoneSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken:(state, action)=>{
      state.token = action.payload
    },
    savePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload; 
    },
    saveRole: (state, action) => {
      state.role = action.payload; 
    },
    clearPhoneNumber: (state) => {
      state.phoneNumber = ''; 
    },
    setUserDetails: (state, action) => {
      // Update the state with the payload
      return { ...state, ...action.payload };
    },
  },
});

export const { savePhoneNumber, clearPhoneNumber, saveRole , saveToken,setUserDetails} = phoneSlice.actions;

export default phoneSlice.reducer;

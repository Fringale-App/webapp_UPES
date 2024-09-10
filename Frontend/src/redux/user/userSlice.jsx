import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    failure:(state,action)=> {
      state.response=action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
  },
  signUpSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
  },
  signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
  },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  failure,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
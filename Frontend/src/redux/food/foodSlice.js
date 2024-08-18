// src/redux/foodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
  bucket: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    likeFood: (state, action) => {
      state.bucket.push(action.payload);
      state.currentIndex += 1; // Increment the index
    },
    dislikeFood: (state) => {
      state.currentIndex += 1;
    },
    resetFood: (state) => {
      state.currentIndex = 0;
      state.bucket = [];
    },
    removeFromBucket: (state, action) => {
      state.bucket = state.bucket.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { likeFood, dislikeFood, resetFood, removeFromBucket } = foodSlice.actions;

export default foodSlice.reducer;

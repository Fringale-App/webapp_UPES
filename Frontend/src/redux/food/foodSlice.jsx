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
      if (action.payload && action.payload.name) {
        state.bucket.push(action.payload);
        state.currentIndex += 1;
      }
    },
    dislikeFood: (state) => {
      state.currentIndex += 1;
    },
    resetFood: (state) => {
      state.currentIndex = 0;
      state.bucket = [];
    },
    removeFromBucket: (state, action) => {
      if (action.payload && action.payload.name) {
        state.bucket = state.bucket.filter(item => item && item.name !== action.payload.name);
      }
    },
  },
});

export const { likeFood, dislikeFood, resetFood, removeFromBucket } = foodSlice.actions;

export default foodSlice.reducer;

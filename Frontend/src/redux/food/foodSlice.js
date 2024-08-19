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
      // Ensure the action payload is valid before adding to the bucket
      if (action.payload && action.payload.name) {
        state.bucket.push(action.payload);
        state.currentIndex += 1; // Increment the index
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
      // *** Use name property for comparison instead of id ***
      if (action.payload && action.payload.name) {
        state.bucket = state.bucket.filter(item => item && item.name !== action.payload.name);
      }
    },
  },
});

export const { likeFood, dislikeFood, resetFood, removeFromBucket } = foodSlice.actions;

export default foodSlice.reducer;

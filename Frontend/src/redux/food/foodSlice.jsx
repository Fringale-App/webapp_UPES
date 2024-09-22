// foodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bucket: [], // Stores liked food items
  currentIndex: 0, // Tracks the current swipe index
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    likeFood: (state, action) => {
      const foodItem = action.payload;
      // Check if the item is already in the bucket
      const isAlreadyLiked = state.bucket.some(item => item.name === foodItem.name);
      
      if (!isAlreadyLiked) {
        // Add the item only if it's not already in the bucket
        const itemWithId = { ...foodItem, id: Date.now().toString() };
        state.bucket.push(itemWithId);
      }
      state.currentIndex += 1;
    },
    dislikeFood: (state, action) => {
      state.currentIndex += 1;
    },
    removeFromBucket: (state, action) => {
      const foodId = action.payload;
      state.bucket = state.bucket.filter(item => item.id !== foodId);
    },
    resetIndex: (state) => {
      state.currentIndex = 0;
    }
  },
});

export const { likeFood, dislikeFood, removeFromBucket, resetIndex } = foodSlice.actions;
export default foodSlice.reducer;
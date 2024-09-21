import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
  bucket: [],
  likedFoods: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    likeFood: (state, action) => {
      if (action.payload && action.payload.id) {
        if (!state.bucket.some(item => item.id === action.payload.id)) {
          state.bucket.push(action.payload);
        }
        if (!state.likedFoods.includes(action.payload.id)) {
          state.likedFoods.push(action.payload.id);
        }
        state.currentIndex += 1;
      }
    },
    dislikeFood: (state) => {
      state.currentIndex += 1;
    },
    resetFood: (state) => {
      state.currentIndex = 0;
      state.bucket = [];
      state.likedFoods = [];
    },
    removeFromBucket: (state, action) => {
      if (action.payload && action.payload.id) {
        state.bucket = state.bucket.filter(item => item && item.id !== action.payload.id);
        state.likedFoods = state.likedFoods.filter(id => id !== action.payload.id);
      }
    },
    toggleLikeFood: (state, action) => {
      const foodId = action.payload;
      if (foodId === undefined) return; // Guard clause
      
      const index = state.likedFoods.indexOf(foodId);
      if (index > -1) {
        state.likedFoods.splice(index, 1);
        state.bucket = state.bucket.filter(item => item.id !== foodId);
      } else {
        state.likedFoods.push(foodId);
        const foodItem = state.bucket.find(item => item.id === foodId);
        if (foodItem && !state.bucket.some(item => item.id === foodId)) {
          state.bucket.push(foodItem);
        }
      }
    },
    
  },
});

export const { likeFood, dislikeFood, resetFood, removeFromBucket, toggleLikeFood } = foodSlice.actions;

export default foodSlice.reducer;
// src/redux/foodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodItems: [
    { id: 1, name: "Burger", image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=", description: "A delicious burger with cheese and lettuce." },
    { id: 2, name: "Pizza", image: "https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg", description: "A cheesy pizza with your favorite toppings." },
    // Add more food items here
  ],
  currentIndex: 0,
  bucket: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    likeFood: (state) => {
      const currentFood = state.foodItems[state.currentIndex];
      state.bucket.push(currentFood);
      state.currentIndex = (state.currentIndex + 1) % state.foodItems.length;
    },
    dislikeFood: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.foodItems.length;
    },
    resetFood: (state) => {
      state.currentIndex = 0;
      state.bucket = [];
    },
  },
});

export const { likeFood, dislikeFood, resetFood } = foodSlice.actions;

export default foodSlice.reducer;

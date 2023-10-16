import { configureStore } from '@reduxjs/toolkit';
import {reducer} from './reducers'; // Import your reducer function

const store = configureStore({
    reducer: {
      products: reducer, // Assuming "products" is the name you defined for the slice
    },
  });

export default store;

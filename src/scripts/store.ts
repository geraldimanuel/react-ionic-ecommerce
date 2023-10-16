import { configureStore } from '@reduxjs/toolkit';
import {reducer} from './reducers'; // Import reducer function

const store = configureStore({
    reducer: {
      products: reducer, // Assuming "products"  defined for the slice
    },
  });

export default store;

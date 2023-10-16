import { createSlice } from "@reduxjs/toolkit";


  const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [
            {
                id: 1,
                name: 'Product 1',
                price: 10000,
            },
            {
                id: 2,
                name: 'Product 2',
                price: 15000,
            },
            {
                id: 3,
                name: 'Product 3',
                price: 20000,
            },
            {
                id: 4,
                name: 'Product 4',
                price: 25000,
            },
            {
                id: 5,
                name: 'Product 5',
                price: 25000,
            },
            {
                id: 6,
                name: 'Product 6',
                price: 25000,
            },

        ],
      wishlist: [   {
        id: 1,
        name: 'Product 1',
        price: 10000,
    },],
      cart: [],
    },
    reducers: {
        removeFromWishlist: (state: any, action) => {
            state.wishlist = state.wishlist.filter((product: any) => product.id != action.payload.id);
        },

        addToCart: (state: any, action) => {
            state.cart.push(action.payload);
        },

        removeFromCart: (state: any, action) => {
            // only delete product passed in action payload
            state.cart = state.cart.filter((product: any) => product.id != action.payload.id);
        },

        addToWishlist: (state: any, action) => {
            state.wishlist.push(action.payload);
        },

    },
  });
  export default productSlice;
  export const { reducer, actions } = productSlice;
export const { addToWishlist, addToCart, removeFromWishlist, removeFromCart } = actions;

export const addProduct = (product: any) => ({
    type: 'ADD_PRODUCT',
    product,
  });

  export const addToWishlist = (product: any) => ({
    type: 'ADD_TO_WISHLIST',
    product,
  });
  
  export const removeFromWishlist = (product: any) => ({
    type: 'REMOVE_FROM_WISHLIST',
    product,
  });
  
  export const addToCart = (product: any) => ({
    type: 'ADD_TO_CART',
    product,
  });
  
  export const removeFromCart = (product: any) => ({
    type: 'REMOVE_FROM_CART',
    product,
  });
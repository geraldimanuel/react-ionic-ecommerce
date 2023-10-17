import { createSlice } from "@reduxjs/toolkit";

interface Product {
	id: number;
	name: string;
	price: number;
	qty: number;
	img: string;
}

interface OrderDetails {
	transactionCode: string;
	total: number;
	qty: number;
	products: Product[];
}

interface ProductState {
	products: Product[];
	wishlist: Product[];
	cart: Product[];
	orderHistory: OrderDetails[];
}

const initialState: ProductState = {
	products: [
		{
			id: 1,
			name: "Suhr Antique",
			price: 36000000,
			qty: 0,
			img: "./assets/products/Gitar_1.webp"
		},
		{
			id: 2,
			name: "PRS SE24",
			price: 68000000,
			qty: 0,
			img: "./assets/products/Gitar_2.webp"

		},
		{
			id: 3,
			name: "PRS CS24",
			price: 57000000,
			qty: 0,
			img: "./assets/products/Gitar_3.webp"

		},
		{
			id: 4,
			name: "PRS SE Custom",
			price: 53000000,
			qty: 0,
			img: "./assets/products/Gitar_4.webp"

		},
		{
			id: 5,
			name: "Tom Anderson S",
			price: 32000000,
			qty: 0,
			img: "./assets/products/Gitar_5.webp"

		},
		{
			id: 6,
			name: "Ibanez RG",
			price: 21000000,
			qty: 0,
			img: "./assets/products/Gitar_6.webp"

		},
	],
	wishlist: [],
	cart: [],
	orderHistory: [],
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addToWishlist: (state: any, action) => {
			// if product is already in wishlist, do nothing
			const existingProduct = state.wishlist.find(
				(product: any) => product.id === action.payload.id
			);

			if (!existingProduct) {
				state.wishlist.push(action.payload);
			}
		},

		removeFromWishlist: (state: any, action) => {
			state.wishlist = state.wishlist.filter(
				(product: any) => product.id != action.payload.id
			);
		},

		addToCart: (state, action) => {
			const { id, name, price,img } = action.payload;
			const existingProduct = state.cart.find((product) => product.id === id);

			if (existingProduct) {
				// If the product is already in the cart, increase its quantity
				existingProduct.qty++;
			} else {
				// If the product is not in the cart, add it with a quantity of 1
				state.cart.push({
					id,
					name,
					price,
					img,
					qty: 1,
				});
			}
		},

		removeFromCart: (state: any, action) => {
			// only delete product passed in action payload
			state.cart = state.cart.filter(
				(product: any) => product.id != action.payload.id
			);
		},

		increaseQty: (state, action) => {
			const { id } = action.payload;
			const product = state.cart.find((product) => product.id === id);

			if (product) {
				product.qty++;
			}
		},

		decreaseQty: (state, action) => {
			const { id } = action.payload;
			const productIndex = state.cart.findIndex((product) => product.id === id);

			if (productIndex !== -1) {
				const product = state.cart[productIndex];

				if (product.qty > 1) {
					product.qty--;
				} else {
					// If the quantity is 1 or less, remove the product from the cart
					state.cart.splice(productIndex, 1);
				}
			}
		},

		addToOrderHistory: (state) => {
			const transactionCode = generateTransactionCode(state.orderHistory);
			const orderDetails: OrderDetails = {
				transactionCode,
				total: state.cart.reduce(
					(total, product) => total + product.qty * product.price,
					0
				),
				qty: state.cart.reduce(
					(totalQty, product) => totalQty + product.qty,
					0
				),
				products: [...state.cart],
			};
			state.orderHistory.push(orderDetails);
			state.cart = []; // Clear the cart after adding the order to history.
		},
	},
});

// Helper function to generate a transaction code
function generateTransactionCode(orderHistory: OrderDetails[]): string {
	let newCode: string = "";
	let isUnique = false;

	while (!isUnique) {
		newCode = `GIW${getRandomThreeDigitNumber()}`;
		isUnique = orderHistory.every((order) => order.transactionCode !== newCode);
	}

	return newCode;
}

// Helper function to generate a random 3-digit number
function getRandomThreeDigitNumber(): string {
	return String(Math.floor(100 + Math.random() * 900)); 
}

export default productSlice;
export const { reducer, actions } = productSlice;
export const {
	addToWishlist,
	addToCart,
	removeFromWishlist,
	removeFromCart,
	increaseQty,
	decreaseQty,
	addToOrderHistory
} = actions;

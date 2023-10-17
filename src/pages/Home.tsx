import {
	IonContent,
	IonHeader,
	IonPage,
	IonGrid,
	IonRow,
	IonCol,
	IonToast,
} from "@ionic/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

// import redux
import { connect } from "react-redux";
import { Key, useState } from "react";

import { addToWishlist, addToCart } from "../scripts/reducers";

import "./Home.css";
import Card from "../components/Card";
import Toolbar from "../components/Toolbar";

type props = {
	products: any;
	addToWishlist: any;
	addToCart: any;
};

const Home: React.FC<props> = ({ products, addToWishlist, addToCart }) => {
	const [toastMessage, setToastMessage] = useState("");

	return (
		<>
			<IonToast
				isOpen={!!toastMessage}
				message={toastMessage}
				duration={2000}
				onDidDismiss={() => {
					setToastMessage("");
				}}
			/>
			<IonPage>
				<IonHeader>
					<Toolbar title="GIW" />
				</IonHeader>
				<IonContent className="">
					<Swiper
						pagination={{
							dynamicBullets: true,
						}}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						modules={[Pagination, Autoplay]}
						className="mySwiper"
					>
						<SwiperSlide>
							<img
								className="swiper"
								src="./assets/products/Gitar_7.webp"
								alt=""
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								className="swiper"
								src="./assets/products/Gitar_6.webp"
								alt=""
							/>
						</SwiperSlide>
						<SwiperSlide>
							<img
								className="swiper"
								src="./assets/products/Gitar_5.webp"
								alt=""
							/>
						</SwiperSlide>
					</Swiper>
					<IonGrid>
						<IonRow>
							{products?.map(
								(
									product: { name: string; price: number; img: string },
									index: Key | null | undefined
								) => (
									<IonCol key={index} size="6">
										<Card
											img={product.img}
											product={product.name}
											price={product.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
											wishlistProps={() => {
												addToWishlist(product);
												setToastMessage("Product added to wishlist!");
											}}
											cartProps={() => {
												addToCart(product);
												setToastMessage("Product added to cart!");
											}}
										/>
									</IonCol>
								)
							)}
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		products: state.products.products,
		wishlist: state.products.wishlist,
		cart: state.products.cart,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		addToWishlist: (product: any) => dispatch(addToWishlist(product)),
		addToCart: (product: any) => dispatch(addToCart(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

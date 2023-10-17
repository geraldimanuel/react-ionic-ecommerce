import {
	IonAlert,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonPage,
	IonRow,
	IonToast,
} from "@ionic/react";

import React, { Key, useRef, useState } from "react";
import { connect } from "react-redux";

import { cart, trash } from "ionicons/icons";

import { addToCart, removeFromWishlist } from "../scripts/reducers";
import Toolbar from "../components/Toolbar";

import "./Wishlist.css";

type props = {
	wishlist: any;
	addToCart: any;
	removeFromWishList: any;
};

const Wishlist: React.FC<props> = ({
	wishlist,
	addToCart,
	removeFromWishList,
}) => {
	const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

	const [toastMessage, setToastMessage] = useState("");

	const [selectedProduct, setSelectedProduct] = useState<any>(null);

	const [startDeleting, setStartDeleting] = useState(false);

	const startDeleteProductHandler = (product: any) => {
		slidingOptionsRef.current?.closeOpened();

		setStartDeleting(true);
		const selected_product = wishlist.find((p: any) => p.id === product.id);

		setSelectedProduct(selected_product);
	};

	const deleteProductHandler = () => {
		setStartDeleting(false);
		setToastMessage("Product deleted!");
		removeFromWishList(selectedProduct);

		setSelectedProduct(null);
	};

	const addToCartHandler = (product: any) => {
		slidingOptionsRef.current?.closeOpened();

		const selected_product = wishlist.find((p: any) => p.id === product.id);

		// masukin ke cart
		addToCart(selected_product);
		removeFromWishList(selected_product);

		setToastMessage("Product added to cart!");
	};

	return (
		<>
			<IonAlert
				isOpen={startDeleting}
				header="Are you sure?"
				message="Do you want to delete your liked product? This cannot be undone."
				buttons={[
					{
						text: "No",
						role: "cancel",
						handler: () => {
							setStartDeleting(false);
						},
					},
					{ text: "Yes", handler: deleteProductHandler },
				]}
			/>
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
					<Toolbar title="Wishlist" />
				</IonHeader>
				<IonContent className="">
					{wishlist?.map(
						(
							product: { name: string; price: number; img: string },
							index: Key | null | undefined
						) => (
							<IonItemSliding key={index} ref={slidingOptionsRef}>
								<IonItemOptions side="start">
									<IonItemOption
										color="danger"
										onClick={startDeleteProductHandler.bind(null, product)}
									>
										<IonIcon color={"dark"} slot="icon-only" icon={trash} />
									</IonItemOption>
								</IonItemOptions>
								<IonItemOptions side="end">
									<IonItemOption
										color="success"
										onClick={addToCartHandler.bind(null, product)}
									>
										<IonIcon color={"dark"} slot="icon-only" icon={cart} />
									</IonItemOption>
								</IonItemOptions>
								<IonItem lines="full" button className="">
									<IonGrid>
										<IonRow className="ion-align-items-center">
											<IonCol size="3.4">
												<IonImg src={product.img} />
											</IonCol>
											<IonCol size="">
												<h3>{product.name}</h3>
												<h5>
													{product.price.toLocaleString("id-ID", {
														style: "currency",
														currency: "IDR",
													})}
												</h5>
											</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
							</IonItemSliding>
						)
					)}
				</IonContent>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		wishlist: state.products.wishlist,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		addToCart: (product: any) => dispatch(addToCart(product)),
		removeFromWishList: (product: any) => dispatch(removeFromWishlist(product)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);

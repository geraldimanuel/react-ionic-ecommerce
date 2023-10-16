import {
	IonAlert,
	IonButton,
	IonCol,
	IonContent,
	IonFooter,
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
	IonTitle,
	IonToast,
	IonToolbar,
} from "@ionic/react";

import React, { Key, useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";

import { add, remove, trash } from "ionicons/icons";

import {
	removeFromCart,
	increaseQty,
	decreaseQty,
	addToOrderHistory,
} from "../scripts/reducers";
import Toolbar from "../components/Toolbar";

import "./Cart.css";

type props = {
	cartData: any;
	removeFromCart: any;
	decreaseQty: any;
	increaseQty: any;
	addToOrderHistory: any;
};

const Cart: React.FC<props> = ({
	cartData,
	removeFromCart,
	decreaseQty,
	increaseQty,
	addToOrderHistory,
}) => {
	const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

	const [toastMessage, setToastMessage] = useState("");

	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [total_price, setTotalPrice] = useState(0);

	const [startDeleting, setStartDeleting] = useState(false);

	const startDeleteProductHandler = (product: any) => {
		slidingOptionsRef.current?.closeOpened();

		setStartDeleting(true);
		const selected_product = cartData.find((p: any) => p.id === product.id);

		setSelectedProduct(selected_product);
	};

	const deleteProductHandler = () => {
		setStartDeleting(false);
		setToastMessage("Product deleted!");
		removeFromCart(selectedProduct);

		setSelectedProduct(null);
	};

	useEffect(() => {
		let total = 0;
		cartData.forEach((product: any) => {
			total += product.price * product.qty;
		});
		setTotalPrice(total);
	}, [cartData]);

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
					<Toolbar title="Cart" />
				</IonHeader>
				<IonContent className="">
					{cartData?.map(
						(
							product: { name: string; price: number; qty: number },
							index: Key | null | undefined
						) => (
							<IonItemSliding key={index} ref={slidingOptionsRef}>
								<IonItemOptions side="end">
									<IonItemOption
										color="danger"
										onClick={startDeleteProductHandler.bind(null, product)}
									>
										<IonIcon slot="icon-only" icon={trash} />
									</IonItemOption>
								</IonItemOptions>
								<IonItem lines="full" button className="">
									<IonGrid>
										<IonRow className="ion-align-items-center">
											<IonCol size="3.2">
												<IonImg src="https://ionicframework.com/docs/img/demos/card-media.png" />
											</IonCol>
											<IonCol size="">
												<h4>{product.name}</h4>
												<h5>
													{product.price.toLocaleString("id-ID", {
														style: "currency",
														currency: "IDR",
													})}
												</h5>
											</IonCol>
											<IonCol size="3">
												<IonGrid>
													<IonRow className="ion-align-items-center">
														<IonCol size="auto" className="ion-padding-end">
															<IonIcon
																size="small"
																icon={remove}
																onClick={decreaseQty.bind(null, product)}
															/>
														</IonCol>
														<IonCol size="auto">
															<p>{product.qty}</p>
														</IonCol>
														<IonCol size="auto" className="ion-padding-start">
															<IonIcon
																size="small"
																icon={add}
																onClick={increaseQty.bind(null, product)}
															/>
														</IonCol>
													</IonRow>
												</IonGrid>
											</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
							</IonItemSliding>
						)
					)}
				</IonContent>
				<IonFooter>
					<IonToolbar className="footer">
						<IonGrid className="ion-padding-horizontal">
							<IonRow>
								<IonCol>
									<IonGrid className="ion-no-padding">
										<IonRow>
											<p className="harga">Total Harga</p>
										</IonRow>
										<IonRow className="ion-no-margin">
											<h5>
												{total_price.toLocaleString("id-ID", {
													style: "currency",
													currency: "IDR",
												})}
											</h5>
										</IonRow>
									</IonGrid>
								</IonCol>
								<IonButton color={"light"} onClick={addToOrderHistory}>
									<p className="checkout">Checkout</p>
								</IonButton>
							</IonRow>
						</IonGrid>
					</IonToolbar>
				</IonFooter>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		cartData: state.products.cart,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		removeFromCart: (product: any) => dispatch(removeFromCart(product)),
		decreaseQty: (product: any) => dispatch(decreaseQty(product)),
		increaseQty: (product: any) => dispatch(increaseQty(product)),
		addToOrderHistory: () => dispatch(addToOrderHistory()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

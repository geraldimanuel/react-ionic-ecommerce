import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
} from "@ionic/react";
import React, { Key } from "react";
import Toolbar from "../components/Toolbar";

import { connect } from "react-redux";

type props = {
	cart: any;
};

const Cart: React.FC<props> = ({ cart }) => {
	return (
		<>
			<IonPage>
				<IonHeader>
					<Toolbar title="Cart" />
				</IonHeader>
				<IonContent className="ion-padding">
					<IonGrid>
						<IonRow>
							<h1>Cart</h1>
						</IonRow>
						<IonRow>
							{cart?.map(
								(
									product: { name: string; price: number },
									index: Key | null | undefined
								) => (
									<IonCol size="6" key={index}>
										<IonCard>
											<img
												alt="Silhouette of mountains"
												src="https://ionicframework.com/docs/img/demos/card-media.png"
											/>
											<IonCardHeader>
												<IonCardSubtitle>Rp. {product.price}</IonCardSubtitle>
												<p className="heading">{product.name}</p>
											</IonCardHeader>

											<IonCardContent></IonCardContent>
										</IonCard>
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
		cart: state.products.cart,
	};
};

export default connect(mapStateToProps)(Cart);

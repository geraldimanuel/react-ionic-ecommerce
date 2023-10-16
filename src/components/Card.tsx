import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonIcon,
	IonRow,
} from "@ionic/react";

import "./Card.css";
import { bagAdd, heart } from "ionicons/icons";
import { connect } from "react-redux";
// import { addToCart, addToWishlist } from "../scripts/reducers";

import { addToWishlist } from "../scripts/reducers";

type props = {
	img: string;
	product: string;
	price: string;
	wishlistProps: any;
	cartProps: any;
};

const Card: React.FC<props> = ({
	img,
	product,
	price,
	wishlistProps,
	cartProps,
}) => {
	return (
		<IonCard>
			<img alt="Silhouette of mountains" src={img} />
			<IonCardHeader>
				<IonCardSubtitle>{price}</IonCardSubtitle>
				<p className="heading">{product}</p>
			</IonCardHeader>

			<IonCardContent>
				<IonGrid>
					<IonRow className="ion-justify-content-between">
						<IonIcon
							icon={heart}
							color="danger"
							size="small"
							onClick={wishlistProps}
						/>
						<IonIcon icon={bagAdd} color="" size="small" onClick={cartProps} />
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

const mapStateToProps = (state: any) => {
	return {
		products: state.products.products,
	};
};

export default connect(mapStateToProps, { addToWishlist })(Card);

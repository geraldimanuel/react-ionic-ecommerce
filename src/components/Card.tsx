import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonGrid,
	IonIcon,
	IonRow,
	IonText,
} from "@ionic/react";

import "./Card.css";
import { bagAdd, heart } from "ionicons/icons";
import { connect } from "react-redux";

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
				<IonCardSubtitle className="ion-no-margin">{price}</IonCardSubtitle>
				<IonText className="heading" color={"dark"}>
					{product}
				</IonText>
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
						<IonIcon
							color={"dark"}
							icon={bagAdd}
							size="small"
							onClick={cartProps}
						/>
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

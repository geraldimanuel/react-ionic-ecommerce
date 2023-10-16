import {
	IonBadge,
	IonButtons,
	IonIcon,
	IonMenuButton,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

import "./Toolbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cart } from "ionicons/icons";
import { useEffect, useState } from "react";

type props = {
	title: string;
	cartData: any;
};

const Toolbar: React.FC<props> = ({ title, cartData }) => {
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		let count = 0;

		// only count unique products
		cartData.forEach(() => {
			count += 1;
		});

		setCartCount(count);
	}, [cartData]);

	return (
		<>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton color="dark" />
				</IonButtons>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					<Link to="/cart">
						<IonBadge color={"danger"}>{cartCount}</IonBadge>
						<IonIcon className="carousel" icon={cart} size="small" />
					</Link>
				</IonButtons>
			</IonToolbar>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		cartData: state.products.cart,
	};
};

export default connect(mapStateToProps)(Toolbar);

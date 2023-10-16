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
};

const Toolbar: React.FC<props> = ({ title }) => {
	return (
		<>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton color="dark" />
				</IonButtons>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					<Link to="/cart">
						<IonBadge color={"danger"}>2</IonBadge>
						<IonIcon className="carousel" icon={cart} size="small" />
					</Link>
				</IonButtons>
			</IonToolbar>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		cart: state.products.cart,
	};
};

export default connect(mapStateToProps)(Toolbar);

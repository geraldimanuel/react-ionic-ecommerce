import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";
import Toolbar from "../components/Toolbar";

const History: React.FC = () => {
	return (
		<>
			<IonPage>
				<IonHeader>
					<Toolbar title="History" />
				</IonHeader>
				<IonContent className="ion-padding">
					<h2>History</h2>
				</IonContent>
			</IonPage>
		</>
	);
};

export default History;

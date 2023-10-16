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

import "./HistoryCard.css";
import { bagAdd, chevronForward, heart } from "ionicons/icons";

type props = {
	transactionCode: string;
	totalPrice: string;
};

const HistoryCard: React.FC<props> = ({ transactionCode, totalPrice }) => {
	return (
		<IonCard className="history">
			<IonGrid>
				<IonRow className="ion-align-items-center">
					<IonCol size="">
						<IonCardHeader className="ion-no-padding">
							<IonCardTitle className="history">{transactionCode}</IonCardTitle>
						</IonCardHeader>

						<IonCardContent className="ion-no-padding">
							<IonCardSubtitle>Total Harga:</IonCardSubtitle>
							<h3>{totalPrice}</h3>
						</IonCardContent>
					</IonCol>
					<IonCol size="1.5">
						<IonIcon icon={chevronForward} size="large" />
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonCard>
	);
};

export default HistoryCard;

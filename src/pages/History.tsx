import {
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonModal,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { Key, useState } from "react";

import { connect } from "react-redux";

import Toolbar from "../components/Toolbar";
import HistoryCard from "../components/HistoryCard";
import { chevronBack } from "ionicons/icons";

type props = {
	orderData: any;
};

const History: React.FC<props> = ({ orderData }) => {
	const [isDetail, setIsDetail] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState({} as any);

	const handleDetail = (order: any) => {
		setSelectedOrder(order);
		setIsDetail(!isDetail);
	};

	return (
		<>
			<IonModal isOpen={isDetail}>
				<IonHeader>
					<IonToolbar>
						<IonIcon
							icon={chevronBack}
							size="small"
							onClick={() => setIsDetail(!isDetail)}
						/>
						<IonTitle>Order Details</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<IonGrid>
						<IonRow>
							<h2>Order ID: {selectedOrder.transactionCode}</h2>
						</IonRow>
						<IonRow>
							<h4>Products:</h4>
						</IonRow>
						{selectedOrder?.products?.map(
							(
								product: {
									name: string;
									price: number;
									qty: number;
								},
								index: Key | null | undefined
							) => (
								<IonRow key={index}>
									<IonCol>{product.name}</IonCol>
									<IonCol>
										({product.qty}) x{" "}
										{product.price.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</IonCol>
								</IonRow>
							)
						)}
						{isDetail && (
							<IonRow className="ion-padding-vertical">
								<h4>
									Total:{" "}
									{selectedOrder.total.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}
								</h4>
							</IonRow>
						)}
					</IonGrid>
				</IonContent>
			</IonModal>
			<IonPage>
				<IonHeader>
					<Toolbar title="History" />
				</IonHeader>
				<IonContent className="ion-padding">
					<IonGrid>
						{orderData?.map(
							(
								order: { transactionCode: string; total: number },
								index: Key | null | undefined
							) => (
								<IonRow key={index} onClick={() => handleDetail(order)}>
									<IonCol>
										<HistoryCard
											transactionCode={order.transactionCode}
											totalPrice={order.total.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										/>
									</IonCol>
								</IonRow>
							)
						)}
					</IonGrid>
				</IonContent>
			</IonPage>
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		orderData: state.products.orderHistory,
	};
};

export default connect(mapStateToProps)(History);

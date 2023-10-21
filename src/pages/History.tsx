import {
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonLabel,
	IonModal,
	IonPage,
	IonRow,
	IonSegment,
	IonSegmentButton,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { Key, useEffect, useState } from "react";

import { connect } from "react-redux";

import Toolbar from "../components/Toolbar";
import HistoryCard from "../components/HistoryCard";
import { chevronBack } from "ionicons/icons";

import "./History.css";

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

	const [sortedOrder, setSortedOrder] = useState([] as any); // Initial state for sorted data
	const [sortDirection, setSortDirection] = useState("asc"); // Initial sorting direction

	const sortData = (data: any, property: any, direction: any) => {
		const sortedData = [...data];
		return sortedData.sort((a, b) => {
			if (direction === "asc") {
				return a[property] - b[property];
			} else {
				return b[property] - a[property];
			}
		});
	};

	const sortOrdersByPrice = () => {
		const sorted = sortData(orderData, "total", sortDirection);
		setSortedOrder(sorted);
		setSortDirection(sortDirection === "asc" ? "desc" : "asc");
	};

	const sortOrdersByTransactionCode = () => {
		const sorted = sortData(orderData, "transactionCode", sortDirection);
		setSortedOrder(sorted);
		setSortDirection(sortDirection === "asc" ? "desc" : "asc");
	};

	useEffect(() => {
		setSortedOrder(orderData);
	}, [orderData]);

	return (
		<>
			<IonModal isOpen={isDetail}>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonIcon
								color={"dark"}
								icon={chevronBack}
								size="small"
								onClick={() => setIsDetail(!isDetail)}
							/>
						</IonButtons>
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
				<IonContent className="">
					<IonSegment className="">
						<IonSegmentButton value="default" onClick={sortOrdersByPrice}>
							<IonLabel>by price</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton
							value="segment"
							onClick={sortOrdersByTransactionCode}
						>
							<IonLabel>by ID</IonLabel>
						</IonSegmentButton>
					</IonSegment>
					<IonGrid>
						{sortedOrder?.map(
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

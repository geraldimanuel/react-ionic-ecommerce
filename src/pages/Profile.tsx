import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonItem,
	IonAvatar,
	IonIcon,
} from "@ionic/react";
import React, { useRef } from "react";

import "./Profile.css";
import {
	logoDiscord,
	logoInstagram,
	logoLinkedin,
	logoTwitter,
	logoWhatsapp,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";

const Profile: React.FC = () => {
	return (
		<>
			<IonPage>
				<IonHeader>
					<Toolbar title="Profile" />
				</IonHeader>
				<IonContent className="ion-padding">
					<IonCard>
						<IonCardContent>
							<IonGrid className="ion-text-center">
								<IonRow className="ion-justify-content-center">
									<IonAvatar>
										<img
											alt="Silhouette of a person's head"
											src="https://ionicframework.com/docs/img/demos/avatar.svg"
										/>
									</IonAvatar>
								</IonRow>
								<IonRow>
									<IonCol>
										<p className="heading">Gerald Imanuel Wijaya</p>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol>
										<p className="subheading">00000060106</p>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol>
										<p className="text">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Donec vitae purus ligula. Cras convallis diam vitae orci
											ultricies, id dignissim.
										</p>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol>
										<Link
											to={{
												pathname: "https://www.instagram.com/geraldimanuel/",
											}}
											target="_blank"
										>
											<IonIcon icon={logoInstagram} />
										</Link>
									</IonCol>
									<IonCol>
										<IonIcon icon={logoLinkedin} />
									</IonCol>
									<IonCol>
										<IonIcon icon={logoWhatsapp} />
									</IonCol>
									<IonCol>
										<IonIcon icon={logoDiscord} />
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol>
										<IonButton expand="block">My Resume</IonButton>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCardContent>
					</IonCard>
				</IonContent>
			</IonPage>
		</>
	);
};

export default Profile;

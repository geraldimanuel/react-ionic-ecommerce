import {
	IonContent,
	IonHeader,
	IonPage,
	IonCard,
	IonCardContent,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonAvatar,
	IonIcon,
	IonTitle,
	IonText,
} from "@ionic/react";
import React from "react";

import "./Profile.css";
import {
	logoDiscord,
	logoInstagram,
	logoLinkedin,
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
											src="./assets/Geri.jpg"
											className="profile"
										/>
									</IonAvatar>
								</IonRow>
								<IonRow>
									<IonCol>
										<IonText className="heading">Gerald Imanuel Wijaya</IonText>
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
											<IonIcon color={"dark"} icon={logoInstagram} />
										</Link>
									</IonCol>
									<IonCol>
										<IonIcon color={"dark"} icon={logoLinkedin} />
									</IonCol>
									<IonCol>
										<IonIcon color={"dark"} icon={logoWhatsapp} />
									</IonCol>
									<IonCol>
										<IonIcon color={"dark"} icon={logoDiscord} />
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol>
										<Link
											to={{
												pathname:
													"https://gerald-personal-website.vercel.app/GeraldImanuel_CV.pdf",
											}}
											target="_blank"
										>
											<IonButton expand="block">My Resume</IonButton>
										</Link>
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

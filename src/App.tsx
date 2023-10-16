import { Route } from "react-router-dom";
import {
	IonApp,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuToggle,
	IonRouterOutlet,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Wishlist from "./pages/Wishlist";

import {
	heartOutline,
	homeOutline,
	personCircleOutline,
	timeOutline,
} from "ionicons/icons";
import History from "./pages/History";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import store from "./scripts/store";
import Cart from "./pages/Cart";

setupIonicReact();

const App: React.FC = () => (
	<Provider store={store}>
		<IonApp>
			<IonReactRouter>
				<IonMenu contentId="main">
					<IonHeader></IonHeader>
					<IonContent>
						<IonList>
							<IonMenuToggle>
								<IonItem button routerLink="/">
									<IonIcon slot="start" icon={homeOutline}></IonIcon>
									<IonLabel>Home</IonLabel>
								</IonItem>
								<IonItem button routerLink="/wishlist">
									<IonIcon slot="start" icon={heartOutline}></IonIcon>
									<IonLabel>Wishlist</IonLabel>
								</IonItem>
								<IonItem button routerLink="/history">
									<IonIcon slot="start" icon={timeOutline}></IonIcon>
									<IonLabel>History</IonLabel>
								</IonItem>
								<IonItem button routerLink="/profile">
									<IonIcon slot="start" icon={personCircleOutline}></IonIcon>
									<IonLabel>Profile</IonLabel>
								</IonItem>
							</IonMenuToggle>
						</IonList>
					</IonContent>
				</IonMenu>
				<IonRouterOutlet id="main">
					<Route exact path="/" component={Home} />
					<Route path="/wishlist" component={Wishlist} />
					<Route path="/history" component={History} />
					<Route path="/profile" component={Profile} />
					<Route path="/cart" component={Cart} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	</Provider>
);

export default App;

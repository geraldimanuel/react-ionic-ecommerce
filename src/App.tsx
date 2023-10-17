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
	IonToggle,
	ToggleCustomEvent,
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
import { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
	const [themeToggle, setThemeToggle] = useState(false);

	// Listen for the toggle check/uncheck to toggle the dark theme
	const toggleChange = (ev: ToggleCustomEvent) => {
		toggleDarkTheme(ev.detail.checked);
	};

	// Add or remove the "dark" class on the document body
	const toggleDarkTheme = (shouldAdd: boolean) => {
		document.body.classList.toggle("dark", shouldAdd);
	};

	// Check/uncheck the toggle and update the theme based on isDark
	const initializeDarkTheme = (isDark: boolean) => {
		setThemeToggle(isDark);
		toggleDarkTheme(isDark);
	};

	useEffect(() => {
		// Use matchMedia to check the user preference
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

		// Initialize the dark theme based on the initial
		// value of the prefers-color-scheme media query
		initializeDarkTheme(prefersDark.matches);

		// Listen for changes to the prefers-color-scheme media query
		prefersDark.addEventListener("change", (mediaQuery) =>
			initializeDarkTheme(mediaQuery.matches)
		);
	}, []);

	return (
		<Provider store={store}>
			<IonApp>
				<IonReactRouter>
					<IonMenu contentId="main">
						<IonHeader></IonHeader>
						<IonContent>
							<IonList>
								<IonMenuToggle>
									<IonItem button routerLink="/">
										<IonIcon
											color={"dark"}
											slot="start"
											icon={homeOutline}
										></IonIcon>
										<IonLabel>Home</IonLabel>
									</IonItem>
									<IonItem button routerLink="/wishlist">
										<IonIcon
											color={"dark"}
											slot="start"
											icon={heartOutline}
										></IonIcon>
										<IonLabel>Wishlist</IonLabel>
									</IonItem>
									<IonItem button routerLink="/history">
										<IonIcon
											color={"dark"}
											slot="start"
											icon={timeOutline}
										></IonIcon>
										<IonLabel>History</IonLabel>
									</IonItem>
									<IonItem button routerLink="/profile">
										<IonIcon
											color={"dark"}
											slot="start"
											icon={personCircleOutline}
										></IonIcon>
										<IonLabel>Profile</IonLabel>
									</IonItem>
									<IonItem>
										<IonToggle
											checked={themeToggle}
											onIonChange={toggleChange}
											justify="space-between"
										>
											Dark Mode
										</IonToggle>
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
};

export default App;

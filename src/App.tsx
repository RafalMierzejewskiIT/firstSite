import {
	IonApp,
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonRouterOutlet,
	IonToolbar,
	setupIonicReact,
} from '@ionic/react';

import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {useRecoilValue} from 'recoil';
import userStateAtom from './atoms/usersState.atom';
import BurgerMenu from './components/BurgerMenu';
import Routes from './components/Routes/Routes';

setupIonicReact();

const App: React.FC = () => {
	const userState: any = useRecoilValue(userStateAtom);

	return (
		<IonApp>
			<IonReactRouter>
				<BurgerMenu isDisabled={userState ? false : true} />
				<IonPage id='main-content'>
					<IonHeader>
						<IonToolbar color='primary'>
							<IonButtons slot='start'>
								<IonMenuButton />
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonRouterOutlet>
							<Routes />
						</IonRouterOutlet>
					</IonContent>
				</IonPage>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

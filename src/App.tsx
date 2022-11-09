import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import {} from 'ionicons/icons';

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
import TodoItemList from './components/Todo/TodoItemList';
import Home from './pages/Home';
import { Route } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useRecoilValue } from 'recoil';
import userStateAtom from './atoms/usersState.atom';
import BurgerMenu from './components/BurgerMenu';

setupIonicReact();

const App: React.FC = () => {
  const userState: any = useRecoilValue(userStateAtom);
  return (
    <IonApp>
      <BurgerMenu isDisabled={userState ? false : true} />
      <IonPage id='main-content'>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonButtons slot='start'>
              <IonMenuButton />
            </IonButtons>
            <IonToolbar color='primary'>
              <IonTitle className='text-center mr-5'>
                {userState ? userState.user.email : 'Not logged in'}
              </IonTitle>
            </IonToolbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path='/' children={<Home />} />
              <Route exact path='/home'>
                {!userState === true ? <Home /> : <TodoItemList />}
              </Route>
              <Route exact path='/login' children={<Login />} />
              <Route exact path='/signup' children={<Signup />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;

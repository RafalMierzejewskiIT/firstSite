import { IonButton, IonGrid, IonLabel } from '@ionic/react';
import logo from '../assets/logo.jpg';

const Home: React.FC = () => {
  return (
    <IonGrid>
      <div className='flex justify-center w-screen'>
        <img src={logo} alt='logo' />
      </div>
      <div className='flex flex-col w-5/6 mx-auto my-6 space-y-3'>
        <IonButton href='/login'>
          <IonLabel>Sign In</IonLabel>
        </IonButton>
        <IonButton href='/signup'>
          <IonLabel>Sign Up</IonLabel>
        </IonButton>
      </div>
    </IonGrid>
  );
};

export default Home;

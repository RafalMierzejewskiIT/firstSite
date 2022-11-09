import { IonButton, IonGrid, IonLabel } from '@ionic/react';
import logo from '../assets/logo.jpg';

const Home: React.FC = () => {
  return (
    <IonGrid>
      <div className='flex justify-center'>
        <img src={logo} alt='logo' />
      </div>
      <div className='flex flex-col max-w-lg w-[90%] mx-auto my-6 space-y-3'>
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

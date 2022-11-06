import {
  IonAlert,
  IonButton,
  IonGrid,
  IonInput,
  IonItem,
  IonRouterLink,
  IonToast,
  useIonLoading,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { supabase } from '../Supabase';
import logo from '../assets/logo.jpg';
import '../theme/loadingSpinner.css';
import '../theme/toastAndAlert.css';

const Signup = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [currentToast, setCurrentToast] = useState('');
  const [currentError, setCurrentError] = useState('');

  const [present, dismiss] = useIonLoading();
  const history = useHistory();

  const signUp = async () => {
    present({
      cssClass: 'custom-loading',
    });
    try {
      // eslint-disable-next-line
      const { data, error } = await supabase.auth.signUp({
        email: emailValue,
        password: passwordValue,
      });
      if (error) throw error;
      setCurrentToast('Successfully signed up, check your email.');
    } catch (error) {
      setCurrentError(error);
    } finally {
      dismiss();
    }
  };

  const delayedToastForwarding = () => {
    setCurrentToast('');
    history.push('login');
  };

  return (
    <IonGrid>
      <IonToast
        isOpen={Boolean(currentToast)}
        duration={1500}
        message={currentToast}
        position='middle'
        onDidDismiss={delayedToastForwarding}
        cssClass='custom-toast'
      />
      <IonAlert
        onDidDismiss={() => setCurrentError('')}
        isOpen={Boolean(currentError)}
        message={currentError.message}
        cssClass='custom-alert'
      />
      <div className='flex justify-center  w-screen'>
        <img src={logo} alt='logo' />
      </div>
      <IonItem>
        <IonInput
          placeholder='Email'
          value={emailValue}
          onIonChange={(e) => setEmailValue(e.target.value)}
        />
      </IonItem>
      <IonItem>
        <IonInput
          type='password'
          placeholder='Password'
          value={passwordValue}
          onIonChange={(e) => setPasswordValue(e.target.value)}
        />
      </IonItem>
      <div className='flex flex-col w-5/6 mx-auto my-6 space-y-3'>
        <IonButton onClick={signUp}>Sign up</IonButton>
      </div>
      <div className='text-center my-9'>
        <IonRouterLink href='/login'>Already have an account? Click here</IonRouterLink>
      </div>
    </IonGrid>
  );
};

export default Signup;

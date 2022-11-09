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
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState('');
  const [currentToast, setCurrentToast] = useState<any>('');
  const [currentError, setCurrentError] = useState<any>('');

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
      <div className='flex justify-center'>
        <img src={logo} alt='logo' />
      </div>
      <div className='max-w-lg items-center mx-auto'>
        <IonItem>
          <IonInput
            placeholder='Email'
            value={emailValue}
            onIonChange={(e: any) => setEmailValue(e.target.value)}
            autofocus={true}
          />
        </IonItem>
        <IonItem>
          <IonInput
            type='password'
            placeholder='Password'
            value={passwordValue}
            onIonChange={(e: any) => setPasswordValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                signUp();
              }
            }}
          />
        </IonItem>
      </div>
      <div className='flex flex-col max-w-md w-[90%] mx-auto my-6'>
        <IonButton onClick={signUp}>Sign up</IonButton>
      </div>
      <div className='text-center my-9'>
        <IonRouterLink href='/login'>Already have an account? Click here</IonRouterLink>
      </div>
    </IonGrid>
  );
};

export default Signup;

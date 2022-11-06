import {
  IonAlert,
  IonButton,
  IonGrid,
  IonInput,
  IonItem,
  IonRouterLink,
  IonToast,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { supabase } from '../Supabase';
import userStateAtom from '../atoms/usersState.atom';
import logo from '../assets/logo.jpg';
import { useIonLoading } from '@ionic/react';
import '../theme/loadingSpinner.css';
import '../theme/toastAndAlert.css';

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [currentToast, setCurrentToast] = useState('');
  const [currentError, setCurrentError] = useState('');

  const setUserState = useSetRecoilState(userStateAtom);

  const [present, dismiss] = useIonLoading();
  const history = useHistory();

  const signInWithPassword = async () => {
    present({
      cssClass: 'custom-loading',
    });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: passwordValue,
      });
      if (error) throw error;
      setUserState(data);
      setCurrentToast('Successfully logged in as ' + emailValue + '.');
    } catch (error) {
      setCurrentError(error);
    } finally {
      dismiss();
    }
  };

  const delayedToastForwarding = () => {
    setCurrentToast('');
    history.push('home');
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
      <div className='flex justify-center w-screen'>
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
        <IonButton onClick={signInWithPassword}>Login</IonButton>
      </div>
      <div className='text-center my-9'>
        <IonRouterLink href='/signup'>Don't have an account yet? Sign up</IonRouterLink>
      </div>
    </IonGrid>
  );
};

export default Login;

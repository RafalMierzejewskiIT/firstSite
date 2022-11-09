import {
  IonAlert,
  IonButton,
  IonGrid,
  IonInput,
  IonItem,
  IonRouterLink,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { supabase } from '../Supabase';
import userStateAtom from '../atoms/usersState.atom';
import logo from '../assets/logo.jpg';
import { useIonLoading } from '@ionic/react';
import '../theme/variables.css';

const Login: React.FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [currentToast, setCurrentToast] = useState<any>('');
  const [currentError, setCurrentError] = useState<any>('');

  const setUserState: any = useSetRecoilState(userStateAtom);

  const [present, dismiss] = useIonLoading();
  const router = useIonRouter();

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
    } catch (error: any) {
      setCurrentError(error);
    } finally {
      dismiss();
    }
  };

  const delayedToastForwarding = () => {
    setCurrentToast('');
    router.push('home');
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
                signInWithPassword();
              }
            }}
          />
        </IonItem>
      </div>
      <div className='flex flex-col max-w-md w-[90%] mx-auto my-6'>
        <IonButton onClick={signInWithPassword}>Login</IonButton>
      </div>
      <div className='text-center my-9'>
        <IonRouterLink href='/signup'>Don't have an account yet? Sign up</IonRouterLink>
      </div>
    </IonGrid>
  );
};

export default Login;

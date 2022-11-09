import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenu,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import userStateAtom from '../atoms/usersState.atom';
import { supabase } from '../Supabase';
import '../theme/loadingSpinner.css';
import '../theme/toastAndAlert.css';

interface BurgerMenuInterface {
  isDisabled: boolean;
}

const BurgerMenu: React.FC<BurgerMenuInterface> = ({ isDisabled }) => {
  const [currentToast, setCurrentToast] = useState<string>('');
  const [currentError, setCurrentError] = useState<any>('');

  const userState = useRecoilValue(userStateAtom);
  const resetAtom = useResetRecoilState(userStateAtom);
  const history = useHistory();

  const signOut = async () => {
    console.log('out');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      resetAtom();
      setCurrentToast('You have been logged out.');
    } catch (error: any) {
      setCurrentError(error);
    } finally {
      // window.location.reload();
    }
  };

  const delayedToastForwarding = () => {
    setCurrentToast('');
    history.push('home');
  };

  return (
    <IonMenu disabled={isDisabled} contentId='main-content'>
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
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {userState && (
          <IonButton onClick={signOut}>
            <IonLabel>Log Out</IonLabel>
          </IonButton>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default BurgerMenu;

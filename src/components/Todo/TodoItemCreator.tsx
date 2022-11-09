import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userStateAtom from '../../atoms/usersState.atom';
import { supabase } from '../../Supabase';

const TodoItemCreator = () => {
  const [userInput, setUserInput] = useState('');
  const userState: any = useRecoilValue(userStateAtom);
  const userId = userState.user.id;

  const addToTable = async () => {
    const { data, error } = await supabase
      .from('todoItems')
      .insert([{ description: userInput, user_id: userId }]);
    window.location.reload();
  };

  return (
    // <div className='max-w-4xl mx-auto my-8 border border-white rounded-lg'>
    <div className='mx-auto border-2 p-1 border-white max-w-4xl rounded-lg m-5 '>
      <IonItem lines='none'>
        <IonInput
          type='text'
          onIonChange={(e: any) => setUserInput(e.target.value)}
          placeholder='Type your new ToDo here'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addToTable();
            }
          }}
        />
        <IonButton onClick={addToTable} size='small'>
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
    </div>
  );
};

export default TodoItemCreator;

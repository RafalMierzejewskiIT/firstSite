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

  const addToDB = async () => {
    const { data, error } = await supabase
      .from('todoItems')
      .insert([{ description: userInput, user_id: userId }]);
    window.location.reload();
  };

  return (
    <div className='mx-auto w-[90%] border-2 border-double p-1 border-white max-w-4xl rounded-md  m-5 '>
      <IonItem lines='none'>
        <IonInput
          type='text'
          onIonChange={(e: any) => setUserInput(e.target.value)}
          placeholder='Type your new ToDo here'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addToDB();
            }
          }}
        />
        <IonButton onClick={addToDB} size='small'>
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
    </div>
  );
};

export default TodoItemCreator;

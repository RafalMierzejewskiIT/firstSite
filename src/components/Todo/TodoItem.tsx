import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { checkmarkOutline, closeOutline, createOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userStateAtom from '../../atoms/usersState.atom';
import { supabase } from '../../Supabase';

type Props = {
  text: string;
  id: number;
};

const TodoItem: React.FC<Props> = ({ text, id }) => {
  const [userInput, setUserInput] = useState<string>(text);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const userState: any = useRecoilValue(userStateAtom);
  const userId = userState.user.id;

  const todoRemove = async (todoId: number) => {
    const { data, error } = await supabase
      .from('todoItems')
      .delete()
      .eq('user_id', userId)
      .eq('id', todoId);
    window.location.reload();
  };

  const todoEdit = async (todoId: number) => {
    const { data, error } = await supabase
      .from('todoItems')
      .update({ description: userInput })
      .eq('user_id', userId)
      .eq('id', todoId);
    setIsReadOnly(true);
    window.location.reload();
  };

  return (
    <IonItem>
      <IonInput
        disabled={isReadOnly}
        type='text'
        value={userInput}
        onIonChange={(e: any) => setUserInput(e.target.value)}
      />
      {isReadOnly ? (
        <IonButton onClick={() => setIsReadOnly(false)}>
          <IonIcon icon={createOutline} />
        </IonButton>
      ) : (
        <IonButton onClick={() => todoEdit(id)}>
          <IonIcon icon={checkmarkOutline} />
        </IonButton>
      )}
      <IonButton onClick={() => todoRemove(id)}>
        <IonIcon icon={closeOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TodoItem;

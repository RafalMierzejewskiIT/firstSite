import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { checkmarkOutline, closeOutline, createOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import todoItemAtom from '../../atoms/todoItem.atom';

const TodoItem = (todo) => {
  const [todoItemAtomState, setTodoItemAtomState] = useRecoilState(todoItemAtom);
  const [readOnlyHandler, setReadOnlyHandler] = useState(true);
  const inputValueRef = useRef();

  const todoRemove = () => {
    const newState = todoItemAtomState.filter((inst) => inst.id !== todo.id);
    setTodoItemAtomState(newState);
  };

  const checkedHandler = () => {
    readOnlyHandler ? setReadOnlyHandler(false) : setReadOnlyHandler(true);
  };

  const editInput = () => {
    checkedHandler();
    let editedArray = structuredClone(todoItemAtomState);
    editedArray[todo.id].text = inputValueRef.current.value;
    setTodoItemAtomState(editedArray);
  };

  return (
    <IonItem>
      <IonInput readonly={readOnlyHandler} type='text' value={todo.text} ref={inputValueRef} />
      {readOnlyHandler ? (
        <IonButton onClick={checkedHandler}>
          <IonIcon icon={createOutline} />
        </IonButton>
      ) : (
        <IonButton onClick={editInput}>
          <IonIcon icon={checkmarkOutline} />
        </IonButton>
      )}
      <IonButton onClick={todoRemove}>
        <IonIcon icon={closeOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TodoItem;

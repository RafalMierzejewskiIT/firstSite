import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import todoItemAtom from '../../atoms/todoItem.atom';

const TodoItemCreator = () => {
  const setTodoList = useSetRecoilState(todoItemAtom);
  const TodoTextRef = useRef();

  const addTodo = () => {
    setTodoList((prevState) => [...prevState, { id: getId(), text: TodoTextRef.current.value }]);
    TodoTextRef.current.value = '';
  };
  return (
    <IonItem>
      <IonInput type='text' ref={TodoTextRef} placeholder='New Todo' />
      <IonButton onClick={addTodo} size='small'>
        <IonIcon icon={add} />
      </IonButton>
    </IonItem>
  );
};

let id = 0;
function getId() {
  return id++;
}

export default TodoItemCreator;

import { useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import todoItemAtom from '../../atoms/todoItem.atom';
import TodoItemCreator from './TodoItemCreator';

const TodoItemList = () => {
  const todoItemAtomState = useRecoilValue(todoItemAtom);

  return (
    <div>
      <TodoItemCreator />
      {todoItemAtomState.map((todo) => (
        <TodoItem key={todo.id} text={todo.text} id={todo.id} />
      ))}
    </div>
  );
};

export default TodoItemList;

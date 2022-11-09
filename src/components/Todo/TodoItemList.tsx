import { useRecoilValue } from 'recoil';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import { useEffect, useState } from 'react';
import { supabase } from '../../Supabase';
import userStateAtom from '../../atoms/usersState.atom';
import { TodoItemType } from '../../types/todoItem.type';

const TodoItemList: React.FC = () => {
  const userState: any = useRecoilValue(userStateAtom);
  const [userTodos, setUserTodos] = useState<TodoItemType[]>([]);
  const userId = userState.user.id;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('todoItems').select('*').eq('user_id', userId);
      return setUserTodos(data as TodoItemType[]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TodoItemCreator />
      <div className='flex flex-col justify-center max-w-4xl mx-auto'>
        {userTodos
          .sort((a: TodoItemType, b: TodoItemType) => a.id - b.id)
          .map((todo: TodoItemType) => (
            <TodoItem key={todo.id} text={todo.description} id={todo.id} />
          ))}
      </div>
    </div>
  );
};

export default TodoItemList;

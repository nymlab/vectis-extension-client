import React, { FormEvent, useMemo, useState } from 'react';
import { useAppContext } from '../../providers/AppProvider';
import { GradientButton } from '../Buttons';
import Input from '../Input';
import { GoPlus } from 'react-icons/go';
import { TodoStatus } from '../../interfaces/TodoStatus';
import Filter from '../Filter';
import TodoItem from '../TodoItem';

const TodosContainer: React.FC = () => {
  const { contractAddr, instantiateTodoContract, todos, addTodo } = useAppContext();
  const [todoValue, setTodoValue] = useState<string>('');
  const [filter, setFilter] = useState<TodoStatus | ''>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValue) {
      setTodoValue('');
      await addTodo(todoValue.trim());
    }
  };

  const filteredTodos = useMemo(() => {
    if (!filter) return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [filter, todos]);

  return (
    <div className="h-full w-full flex justify-center">
      {contractAddr ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center gap-4">
            <form onSubmit={onSubmit} className="flex items-center justify-center gap-4 flex-1">
              <Input
                type="text"
                value={todoValue}
                onChange={({ target }) => setTodoValue(target.value)}
                autoComplete="off"
                placeholder="Add a new 'todo' and press 'Enter'"
              />
              <GradientButton className="h-[32px]">
                <GoPlus />
              </GradientButton>
            </form>
          </div>
          {todos.length ? (
            <>
              <Filter selectedFilter={filter} setFilter={setFilter} />
              <ul className="flex flex-col w-full gap-2 mt-4">
                {filteredTodos.length ? (
                  <>
                    {filteredTodos.map((todo) => {
                      return <TodoItem todo={todo} key={`todo-${todo.id}`} />;
                    })}
                  </>
                ) : (
                  <p className="text-slate-100 text-center p-4 mt-8 text-xl">
                    You don't have any todo in <span className="capitalize">{filter.replace('_', ' ')}</span>
                  </p>
                )}
              </ul>
            </>
          ) : (
            <p className="text-slate-100 text-center p-4 mt-8 text-xl">You don't have any todo in your todo list, try adding one</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <GradientButton onClick={instantiateTodoContract}>Instantiate Todo-List</GradientButton>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;

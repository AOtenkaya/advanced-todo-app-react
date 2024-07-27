// packages
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// icons
import { MdEdit, MdDelete } from 'react-icons/md';

// redux actions
import { deleteTodo } from '@/redux/slices/sectionsSlice';

// components
import Tooltip from './AppTooltip';

const TodoItem = memo(({ todo, onUpdateTodo, sectionId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteTodo = (sectionId, todoId) => {
    dispatch(deleteTodo({ sectionId, todoId }));
  };

  return (
    <div className="flex flex-col w-full h-40 rounded-md justify-between items-center shadow mb-2 bg-gray-500 hover:bg-gray-600 cursor-pointer">
      <header className="flex h-10 w-full justify-between items-center bg-gray-500 px-2 rounded-t-md">
        <h3 className="text-white">{todo.title}</h3>

        <div className="flex">
          <Tooltip text={t('edit_todo')}>
            <MdEdit
              size="1.5rem"
              color="blue"
              className="rounded hover:bg-gray-300 mx-1"
              onClick={() => onUpdateTodo(todo)}
            />
          </Tooltip>

          <Tooltip text={t('delete_todo')}>
            <MdDelete
              size="1.5rem"
              color="red"
              className="rounded hover:bg-gray-300"
              onClick={() => handleDeleteTodo(sectionId, todo.id)}
            />
          </Tooltip>
        </div>
      </header>

      <div className="flex flex-grow w-full rounded-b-md p-2 bg-white">
        {todo.detail}
      </div>
    </div>
  );
});

export default TodoItem;

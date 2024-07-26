import { MdEdit, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { deleteTodo } from '@/redux/slices/sectionsSlice';

const TodoItem = ({ todo, onUpdateTodo, sectionId, isDragging }) => {
  const dispatch = useDispatch();

  const handleDeleteTodo = (sectionId, todoId) => {
    dispatch(deleteTodo({ sectionId, todoId }));
  };

  return (
    <div className="flex flex-col w-full h-40 rounded-md justify-between items-center shadow mb-2 bg-gray-500 hover:bg-gray-600 cursor-pointer">
      <header className="flex h-10 w-full justify-between items-center bg-gray-500 px-2 rounded-t-md">
        <h3 className="text-white">{todo.title}</h3>

        <div className="flex">
          <MdEdit
            size="1.5rem"
            color="blue"
            className="rounded hover:bg-gray-300 mx-1"
            onClick={() => onUpdateTodo(todo)}
          >
            Edit
          </MdEdit>

          <MdDelete
            size="1.5rem"
            color="red"
            className="rounded hover:bg-gray-300"
            onClick={() => handleDeleteTodo(sectionId, todo.id)}
          >
            Delete
          </MdDelete>
        </div>
      </header>

      <div className="flex flex-grow w-full rounded-b-md p-2 bg-white">
        {todo.detail}
      </div>
    </div>
  );
};

export default TodoItem;

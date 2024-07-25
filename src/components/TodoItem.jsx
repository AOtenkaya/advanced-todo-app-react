import { MdEdit, MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const TodoItem = ({ todo, onUpdateTodo }) => {
  const dispatch = useDispatch();

  const handleDeleteTodo = (sectionId, todoId) => {
    dispatch(deleteTodo({ sectionId, todoId }));
  };

  return (
    <div className="flex w-full h-40 justify-between items-center p-2 border rounded shadow mb-2 bg-white hover:bg-gray-100 cursor-pointer">
      <h3>{todo.task}</h3>

      <div className="flex gap-2">
        <MdEdit
          size="2rem"
          color="blue"
          className="border-blue-500 border rounded p-1 hover:bg-gray-200"
          onClick={() => onUpdateTodo(todo)}
        >
          Edit
        </MdEdit>

        <MdDelete
          size="2rem"
          color="red"
          className="border-red-500 border rounded p-1 hover:bg-gray-200"
          onClick={() => handleDeleteTodo(sectionId, todo.id)}
        >
          Delete
        </MdDelete>
      </div>
    </div>
  );
};

export default TodoItem;

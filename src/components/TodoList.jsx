import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TodoList = ({ todos, sectionId, onUpdateTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoItem
                todo={todo}
                sectionId={sectionId}
                onUpdateTodo={onUpdateTodo}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TodoList;

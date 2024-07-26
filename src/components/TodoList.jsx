// packages
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// components
import TodoItem from './TodoItem';

const TodoList = ({ todos, sectionId, onUpdateTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="rounded-md"
            >
              <TodoItem
                todo={todo}
                sectionId={sectionId}
                onUpdateTodo={onUpdateTodo}
                isDragging={snapshot.isDragging}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TodoList;

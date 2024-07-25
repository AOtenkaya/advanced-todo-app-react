import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import {
  addTodo,
  deleteTodo,
  updateTodo,
  updateSectionName,
} from '@/redux/slices/sectionsSlice';

import TodoList from './TodoList';
import TodoModal from './TodoModal';

import { MdDelete } from 'react-icons/md';

const Section = ({ section }) => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const dispatch = useDispatch();

  const handleTodoSubmit = (todo) => {
    console.log(todo);
    if (currentTodo) {
      handleUpdateTodo(todo);
    } else {
      handleAddTodo(todo);
    }
    closeTodoModal();
  };

  const handleAddTodo = (todo) => {
    dispatch(
      addTodo({
        sectionId: section.id,
        todo: { ...todo, id: Date.now().toString() },
      })
    );
  };

  const handleUpdateTodo = (todo) => {
    dispatch(updateTodo({ sectionId: section.id, todo }));
  };

  const handleUpdateSectionName = (event, sectionId) => {
    dispatch(updateSectionName({ newName: event.target.value, sectionId }));
  };

  const openTodoModal = (todo = null) => {
    setCurrentTodo(todo);
    setIsTodoModalOpen(true);
  };

  const closeTodoModal = () => {
    setCurrentTodo(null);
    setIsTodoModalOpen(false);
  };

  return (
    <>
      <Droppable droppableId={section.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: section.backgroundColor }}
            className="flex flex-col w-96 h-100 rounded-md flex-shrink-0"
          >
            <header className="flex h-12 min-w-5 justify-between items-center p-4 bg-slate-100 rounded-t-md">
              <h2
                contentEditable
                onInput={(event) => handleUpdateSectionName(event, section.id)}
              >
                {section.sectionName}
              </h2>

              <MdDelete
                size="2rem"
                color="red"
                className="border-red-500 border rounded p-1 hover:bg-gray-200"
                onClick={() => onDeleteTodo(sectionId, todo.id)}
              >
                Delete
              </MdDelete>
            </header>

            <div className="flex-grow overflow-y-auto p-4">
              <TodoList
                todos={section.todos}
                sectionId={section.id}
                onUpdateTodo={openTodoModal}
              />

              <button
                type="button"
                className="w-full bg-slate-400 rounded-md p-2"
                onClick={() => openTodoModal()}
              >
                Add Todo
              </button>
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isTodoModalOpen && (
        <TodoModal
          isEdit={Boolean(currentTodo)}
          initialValues={currentTodo || { task: '' }}
          onSubmit={handleTodoSubmit}
          onClose={closeTodoModal}
        />
      )}
    </>
  );
};

export default Section;

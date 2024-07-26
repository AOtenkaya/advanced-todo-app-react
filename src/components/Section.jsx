import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';

import {
  addTodo,
  updateTodo,
  updateSectionName,
  deleteSection,
} from '@/redux/slices/sectionsSlice';

import TodoList from './TodoList';
import TodoModal from './TodoModal';

const Section = ({ section }) => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [sectionName, setSectionName] = useState(section.sectionName);

  const dispatch = useDispatch();

  const handleTodoSubmit = (todo) => {
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
        // id should be String because drag drop needs string ids
        todo: { ...todo, id: Date.now().toString() },
      })
    );
  };

  const handleUpdateTodo = (todo) => {
    dispatch(updateTodo({ sectionId: section.id, todo }));
  };

  const handleEditSection = () => {
    setIsEditing(true);
  };

  const handleSectionNameChange = (event) => {
    setSectionName(event.target.value);
  };

  const handleSectionNameBlur = () => {
    dispatch(
      updateSectionName({
        sectionName,
        sectionId: section.id,
      })
    );
    setIsEditing(false);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleDeleteSection = () => {
    dispatch(deleteSection(section.id));
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
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col w-96 h-100 rounded-md flex-shrink-0"
          >
            <header className="flex h-12 min-w-5 justify-between items-center p-4 text-white rounded-t-md bg-gray-500">
              {isEditing ? (
                <input
                  type="text"
                  value={sectionName}
                  onChange={handleSectionNameChange}
                  onBlur={handleSectionNameBlur}
                  onFocus={handleFocus}
                  autoFocus
                  className="bg-transparent"
                />
              ) : (
                <h2 onDoubleClick={handleEditSection}>{sectionName}</h2>
              )}

              <div className="flex gap-2 items-start justify-start">
                <MdEdit
                  size="2rem"
                  color="blue"
                  className="border-blue-700 border rounded-md p-1 hover:bg-gray-300"
                  onClick={handleEditSection}
                >
                  Edit
                </MdEdit>

                <MdDelete
                  size="2rem"
                  color="red"
                  className="border-red-700 border rounded-md p-1 hover:bg-gray-300"
                  onClick={handleDeleteSection}
                >
                  Delete
                </MdDelete>
              </div>
            </header>

            <div className="flex flex-col h-full overflow-y-auto justify-between p-4 bg-mediumGray rounded-b-md">
              <TodoList
                todos={section.todos}
                sectionId={section.id}
                onUpdateTodo={openTodoModal}
              />

              <button
                type="button"
                className="w-full bg-slate-600 rounded-md p-2 text-white"
                onClick={() => openTodoModal()}
              >
                Add Todo
              </button>
            </div>

            <div className="hidden">{provided.placeholder}</div>
          </div>
        )}
      </Droppable>

      {isTodoModalOpen && (
        <TodoModal
          isEdit={Boolean(currentTodo)}
          initialValues={currentTodo || { title: '', detail: '' }}
          onSubmit={handleTodoSubmit}
          onClose={closeTodoModal}
        />
      )}
    </>
  );
};

export default Section;

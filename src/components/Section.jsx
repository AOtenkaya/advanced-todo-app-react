// packages
import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

// icons
import { MdDelete, MdEdit } from 'react-icons/md';

// redux actions
import {
  addTodo,
  updateTodo,
  updateSectionName,
  deleteSection,
} from '@/redux/slices/sectionsSlice';

// components
import TodoList from './TodoList';
import TodoModal from './TodoModal';
import Tooltip from './AppTooltip';

const Section = memo(({ section }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Handling todo modal state and current todo for editing
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const openTodoModal = useCallback(
    (todo = null) => {
      setCurrentTodo(todo);
      setIsTodoModalOpen(true);
    },
    [setCurrentTodo, setIsTodoModalOpen]
  );

  const closeTodoModal = () => {
    setCurrentTodo(null);
    setIsTodoModalOpen(false);
  };

  // Handling section name changes
  const [isEditingSectionName, setIsEditingSectionName] = useState(false);
  const [sectionName, setSectionName] = useState(section.sectionName);

  const handleEditSectionName = () => {
    setIsEditingSectionName(true);
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
    setIsEditingSectionName(false);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  // Handling todo events
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

  const handleTodoSubmit = useCallback(
    (todo) => {
      if (currentTodo) {
        handleUpdateTodo(todo);
      } else {
        handleAddTodo(todo);
      }
      closeTodoModal();
    },
    [currentTodo, handleUpdateTodo, handleAddTodo]
  );

  // Handling section events
  const handleDeleteSection = () => {
    dispatch(deleteSection(section.id));
  };

  return (
    <>
      <Droppable droppableId={section.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col min-w-96 w-fit h-100 rounded-md flex-shrink-0 overflow-x-hidden"
          >
            <header className="flex h-12 min-w-5 justify-between items-center p-4 text-white rounded-t-md bg-gray-500">
              {isEditingSectionName ? (
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
                <h2 onDoubleClick={handleEditSectionName}>{sectionName}</h2>
              )}

              <div className="flex gap-2 items-start justify-start">
                <Tooltip text={t('edit_section_name')}>
                  <MdEdit
                    size="2rem"
                    color="blue"
                    className="border-blue-700 border rounded-md p-1 hover:bg-gray-300"
                    onClick={handleEditSectionName}
                  />
                </Tooltip>

                <Tooltip text={t('delete_section')}>
                  <MdDelete
                    size="2rem"
                    color="red"
                    className="border-red-700 border rounded-md p-1 hover:bg-gray-300"
                    onClick={handleDeleteSection}
                  />
                </Tooltip>
              </div>
            </header>

            <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden justify-between p-4 bg-mediumGray rounded-b-md">
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
                {t('add_todo')}
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
});

export default Section;

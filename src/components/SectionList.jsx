import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Section from './Section.jsx';

import { reorderTodos } from '@/redux/slices/sectionsSlice';

const SectionList = () => {
  const sections = useSelector((state) => state.sections.sections);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      reorderTodos({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sourceSectionId: source.droppableId,
        destinationSectionId: destination.droppableId,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full w-full px-4 py-8 gap-3 overflow-x-auto bg-darkGray">
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default SectionList;

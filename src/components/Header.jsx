import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SectionModal from './SectionModal';

import { addSection } from '@/redux/slices/sectionsSlice';

const Header = () => {
  const dispatch = useDispatch();

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  const openSectionModal = (section = null) => {
    setIsSectionModalOpen(true);
  };

  const closeSectionModal = () => {
    setIsSectionModalOpen(false);
  };

  const handleAddSection = (section) => {
    dispatch(addSection({ ...section, id: Date.now().toString(), todos: [] }));
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-slate-500 font-semibold text-2xl">
        <h1 className="text-white">Advanced Todo List</h1>
        <button
          type="button"
          className="text-white border-black-700 border rounded-md px-4 py-2 hover:bg-slate-600"
          onClick={openSectionModal}
        >
          Add Section
        </button>
      </header>

      {isSectionModalOpen && (
        <SectionModal
          initialValues={{ sectionName: '', backgroundColor: '#ffffff' }}
          onSubmit={(values) => {
            handleAddSection(values);
            closeSectionModal();
          }}
          onClose={closeSectionModal}
        />
      )}
    </>
  );
};

export default Header;

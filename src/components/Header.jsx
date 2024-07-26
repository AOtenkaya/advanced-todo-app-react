import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSection } from '@/redux/slices/sectionsSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleAddSection = () => {
    dispatch(
      addSection({
        sectionName: 'New Section',
        // id should be String because drag drop needs string ids
        id: Date.now().toString(),
        todos: [],
      })
    );
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-slate-600 font-semibold text-2xl">
        <h1 className="text-white">Advanced Todo List</h1>

        <button
          type="button"
          className="text-white border-black-700 border rounded-md px-4 py-2 hover:bg-slate-600"
          onClick={handleAddSection}
        >
          Add Section
        </button>
      </header>
    </>
  );
};

export default Header;

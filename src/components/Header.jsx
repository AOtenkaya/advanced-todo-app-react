// packages
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// redux actions and selectors
import { addSection } from '@/redux/slices/sectionsSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <h1 className="text-white">{t('advanced_todo_list')}</h1>

        <button
          type="button"
          className="text-white border-black-700 border rounded-md px-4 py-2 hover:bg-slate-600"
          onClick={handleAddSection}
        >
          {t('add_section')}
        </button>
      </header>
    </>
  );
};

export default Header;

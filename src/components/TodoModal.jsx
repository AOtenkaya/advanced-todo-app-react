// packages
import React from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const TodoModal = ({ isEdit, initialValues, onSubmit, onClose }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-10 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="absolute bg-white p-5 rounded-md w-1/3 max-w-3/4 box-shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <header>
                <h2 className="text-xl font-bold mb-4">
                  {isEdit ? t('edit_todo') : t('add_todo')}
                </h2>
              </header>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('title')}
                </label>

                <Field
                  type="text"
                  name="title"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  autoFocus
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="detail"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('detail')}
                </label>

                <Field
                  type="text"
                  name="detail"
                  as="textarea"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />

                <ErrorMessage
                  name="detail"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <footer className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 mx-2 rounded"
                >
                  {t('save')}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  {t('cancel')}
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default TodoModal;

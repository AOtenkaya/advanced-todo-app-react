import React from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TodoModal = ({ isEdit, initialValues, onSubmit, onClose }) => {
  const validationSchema = Yup.object({
    task: Yup.string().required('Task is required'),
  });

  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-10 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="absolute bg-white p-5 rounded-md w-1/2 max-w-3/4 box-shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <header>
                <h2 className="text-xl font-bold mb-4">
                  {isEdit ? 'Edit Task' : 'Create Task'}
                </h2>
              </header>

              <div>
                <label
                  htmlFor="task"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task
                </label>
                <Field
                  type="text"
                  name="task"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="task"
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
                  {isEdit ? 'Update Task' : 'Add Task'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
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

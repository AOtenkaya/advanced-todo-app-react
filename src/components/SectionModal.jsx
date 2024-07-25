import React from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SectionModal = ({ initialValues, onSubmit, onClose }) => {
  const validationSchema = Yup.object({
    sectionName: Yup.string().required('Required'),
    backgroundColor: Yup.string().required('Required'),
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
            <Form>
              <header>
                <h2>Add Section</h2>
              </header>

              <div>
                <label htmlFor="sectionName">Section Name</label>
                <Field
                  id="sectionName"
                  name="sectionName"
                  type="text"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="sectionName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="backgroundColor">Background Color</label>
                <Field
                  id="backgroundColor"
                  name="backgroundColor"
                  type="color"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="backgroundColor"
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
                  Submit
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

export default SectionModal;

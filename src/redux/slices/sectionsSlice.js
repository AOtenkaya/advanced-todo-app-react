import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sections: [
    {
      // id should be String because drag drop needs string ids
      id: Date.now().toString(),
      sectionName: 'Todo',
      todos: [],
      backgroundColor: '#53ee87',
    },
  ],
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, actions) => {
      state.sections.push(actions.payload);
    },
    deleteSection: (state, actions) => {
      state.sections = state.sections.filter(
        (section) => section.id !== actions.payload
      );
    },
    updateSectionName: (state, actions) => {
      const { newSectionName, sectionId } = actions.payload;

      const relatedSection = state.sections.find((section) => {
        section.id = sectionId;
      });
      relatedSection.sectionName = newSectionName;
    },
    addTodo: (state, actions) => {
      const { sectionId, todo } = actions.payload;
      const relatedSection = state.sections.find(
        (section) => section.id === sectionId
      );

      if (relatedSection) {
        relatedSection.todos.push(todo);
      }
    },
    deleteTodo: (state, actions) => {
      const { sectionId, todoId } = actions.payload;
      const relatedSection = state.sections.find(
        (section) => section.id === sectionId
      );

      if (relatedSection) {
        const todoIndexToDelete = relatedSection.todos.findIndex(
          (todo) => (todo.id = todoId)
        );
        relatedSection.todos.splice(todoIndexToDelete, 1);
      }
    },
    updateTodo: (state, actions) => {
      const { sectionId, todo } = actions.payload;
      const relatedSection = state.sections.find(
        (section) => section.id === sectionId
      );
      if (relatedSection) {
        const todoIndexToUpdate = relatedSection.todos.findIndex(
          (todo) => todo.id === todo.id
        );
        if (todoIndexToUpdate !== -1) {
          relatedSection.todos.splice(todoIndexToUpdate, 1, todo);
        }
      }
    },
    reorderTodos: (state, actions) => {
      const {
        sourceTodoIndex,
        destinationTodoIndex,
        sourceSectionId,
        destinationSectionId,
      } = actions.payload;

      const sourceSection = state.sections.find(
        (section) => section.id === sourceSectionId
      );

      const destinationSection = state.sections.find(
        (section) => section.id === destinationSectionId
      );

      const [movedTodo] = sourceSection.todos.splice(sourceTodoIndex, 1);

      destinationSection.todos.splice(destinationTodoIndex, 0, movedTodo);
    },
  },
});

export const {
  addSection,
  deleteSection,
  addTodo,
  deleteTodo,
  updateTodo,
  reorderTodos,
  updateSectionName,
} = sectionsSlice.actions;

export default sectionsSlice.reducer;

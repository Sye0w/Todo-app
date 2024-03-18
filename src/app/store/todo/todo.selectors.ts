import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TodoState } from './todo.reducer';

export const selectTodosState = createFeatureSelector<TodoState>('todos')

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => state.todos
)

export const selectActiveTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => !todo.completed) 
);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => todo.completed) 
)
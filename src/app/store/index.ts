import { ActionReducerMap } from '@ngrx/store'
import * as theme from './theme/theme.reducer';
import * as todos from './todo/todo.reducer';

export interface AppState {
  theme: theme.Theme
  todos: todos.TodoState
}

export const reducers: ActionReducerMap<AppState> = {
  theme: theme.themeReducer,
  todos: todos.todosReducer
}
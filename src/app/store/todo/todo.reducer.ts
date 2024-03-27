import { createReducer,on, Action } from '@ngrx/store'
import { addTodo,clearCompleted,updateTodo,reorderTodo  } from './todo.actions'
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage'

  export interface Todo {
   id: number,
   text: string;
   active: boolean;
   completed: boolean
 }

  export interface TodoState {
   todos: Todo[]
  }

  const storageConfig: LocalStorageConfig = {
    keys: ['todos'],
    rehydrate: true,
    storage: localStorage
  }

  const initialState: TodoState = {
   todos: [],
  }

  const todosReducerFunction = createReducer(
  initialState,
  on(addTodo, (state, { text, active = true, completed = false }) => ({
    ...state,
    todos: [
      ...state.todos,
      { id: Date.now(), text, active, completed },
    ],
  })),
  on(updateTodo, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo: Todo) =>
      todo.id === payload.id
        ? { ...todo, active: payload.active, completed: payload.completed }
        : todo
    ),
  })),
  on(clearCompleted, (state) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => !todo.completed),
  })),
  on(reorderTodo, (state, { todos }) => ({
    ...state,
    todos,
  })),
  // localStorageSync(storageConfig)
);

export const todosReducer = (state: TodoState | undefined, action: Action) => {
  return localStorageSync(storageConfig)(todosReducerFunction)(state, action)
}

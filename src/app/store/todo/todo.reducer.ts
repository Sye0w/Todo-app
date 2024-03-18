import { createReducer,on } from '@ngrx/store'
import { addTodo,clearCompleted  } from './todo.actions'

 interface Todo {
  id: number,
  text: string;
  active: boolean;
  completed: boolean
 }

 export interface TodoState {
  todos: Todo[]
 }

 const initialState: TodoState = {
  todos: [],
 }

 export const todosReducer = createReducer(
    initialState,
    on(addTodo, (state, { text, active, completed }) => ({
      ...state,
      todos: [
        ...state.todos,
        { id: Date.now(), text, active, completed }
      ]
    })),
    on(clearCompleted, (state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed)
    }))
 )
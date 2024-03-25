import { createReducer,on } from '@ngrx/store'
import { addTodo,clearCompleted,updateTodo  } from './todo.actions'

 export interface Todo {
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
    on(updateTodo, (state,payload) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === payload.id ?
        { ...todo, active: payload.active, completed: payload.completed }
        : todo
      )
    })),
    on(clearCompleted, (state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed)
    }))
 )

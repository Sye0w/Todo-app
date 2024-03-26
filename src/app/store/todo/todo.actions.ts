import { createAction , props } from '@ngrx/store'
import { Todo } from './todo.reducer'

export const addTodo = createAction('[Todos] Add Todo', props<{text: string; active:boolean; completed: boolean }>())

export const updateTodo = createAction('[Todos] Update Todo',props<{id: number; active: boolean; completed: boolean}>())

export const clearCompleted = createAction('[Todos] Clear Completed' )

export const reorderTodo = createAction('[Todos] Reorder Todos', props<{todos: Todo[]}>())
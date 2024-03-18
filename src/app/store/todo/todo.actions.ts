import { createAction , props } from '@ngrx/store'

export const addTodo = createAction('[Todos] Add Todo', props<{text: string; active:boolean; completed: boolean }>())

export const clearCompleted = createAction('[Todos] Clear Completed' )


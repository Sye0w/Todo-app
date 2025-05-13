import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTodo, clearCompleted, updateTodo, reorderTodo } from '../store/todo/todo.actions';
import { selectAllTodos } from '../store/todo/todo.selectors';
import { Todo, TodoState } from '../store/todo/todo.reducer';
import { AppState } from '../store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  allTodos$: Observable<Todo[]> = this.store.pipe(select(selectAllTodos));

  constructor(private store: Store<AppState>) {}

  getTodos(filter: 'all' | 'active' | 'completed'): Observable<Todo[]> {
    return this.allTodos$.pipe(
      map((todos) => {
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
          default:
            return todos;
        }
      })
    );
  }

  addTodo(text: string, active: boolean, completed: boolean): void {
    const trimmedInput = text.trim();
    if (!trimmedInput) {
      return;
    }
    this.store.dispatch(addTodo({ text, active, completed }));
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(updateTodo({ id: todo.id, active: !todo.active, completed: !todo.completed }));
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompleted());
  }

  reorderTodo(todos: Todo[]): void {
    this.store.dispatch(reorderTodo({ todos }));
  }
}
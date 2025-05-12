import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../store/todo/todo.reducer';
import { addTodo, updateTodo, clearCompleted, reorderTodo } from '../store/todo/todo.actions';
import { selectAllTodos, selectActiveTodos, selectCompletedTodos } from '../store/todo/todo.selectors';
import { AppState } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private filterSubject = new BehaviorSubject<'all' | 'active' | 'completed'>('all');
  currentFilter$ = this.filterSubject.asObservable();
  
  filteredTodos$: Observable<Todo[]> = this.filterSubject.pipe(
    switchMap(filter => {
      switch (filter) {
        case 'all':
          return this.getAllTodos();
        case 'active':
          return this.getActiveTodos();
        case 'completed':
          return this.getCompletedTodos();
      }
    })
  );

  constructor(private store: Store<AppState>) {}

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filterSubject.next(filter);
  }

  getCurrentFilter(): 'all' | 'active' | 'completed' {
    return this.filterSubject.getValue();
  }

  getAllTodos(): Observable<Todo[]> {
    return this.store.pipe(select(selectAllTodos));
  }

  getActiveTodos(): Observable<Todo[]> {
    return this.store.pipe(select(selectActiveTodos));
  }

  getCompletedTodos(): Observable<Todo[]> {
    return this.store.pipe(select(selectCompletedTodos));
  }

  addTodo(text: string, active: boolean = true, completed: boolean = false): void {
    this.store.dispatch(addTodo({ text, active, completed }));
  }

  updateTodo(id: number, active: boolean, completed: boolean): void {
    this.store.dispatch(updateTodo({ id, active, completed }));
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompleted());
  }

  reorderTodos(todos: Todo[]): void {
    this.store.dispatch(reorderTodo({ todos }));
  }

  toggleTodoStatus(todo: Todo): void {
    this.store.dispatch(
      updateTodo({
        id: todo.id,
        active: !todo.completed,
        completed: !todo.completed,
      })
    );
  }
}
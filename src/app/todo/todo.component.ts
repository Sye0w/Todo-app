import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { addTodo, clearCompleted, updateTodo, reorderTodo } from '../store/todo/todo.actions'
import { selectAllTodos, selectActiveTodos, selectCompletedTodos } from '../store/todo/todo.selectors'
import { selectTheme } from '../store/theme/theme.selector'
import { Todo } from '../store/todo/todo.reducer'
import { AppState } from '../store/index'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit {
  todoInput: string = '';
  isDarkMode: boolean;
  sortCheck: boolean = false;

  //TodoProps
  active: boolean = true;
  completed: boolean = false;
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  radioVisibility: boolean[] = [];

  constructor( private store: Store<AppState>){
    this.isDarkMode = false
  }

  ngOnInit(){
    this.store.pipe(select(selectTheme)).subscribe(
      (theme) => this.isDarkMode = theme
    )
    this.sortTodos()
  }

  //filter todos feat
  sortTodos() {
    switch (this.filter) {
      case 'all':
        this.store.pipe(select(selectAllTodos)).subscribe((allTodos) => {
          this.todos = allTodos;
          this.initializeRadioVisibility();
        });
        break;
      case 'active':
        this.store.pipe(select(selectActiveTodos)).subscribe((activeTodos) => {
          this.todos = activeTodos;
          this.initializeRadioVisibility();
        });
        break;
      case 'completed':
        this.store.pipe(select(selectCompletedTodos)).subscribe((completedTodos) => {
          this.todos = completedTodos;
          this.initializeRadioVisibility();
        });
        break;
    }
  }

  initializeRadioVisibility() {
    this.radioVisibility = Array(this.todos.length).fill(false);
  }

  selectSort(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.sortTodos();
  }

  //store actions
  addTodo(){
    const trimmedInput = this.todoInput.trim();
    if(!trimmedInput){
      return;
    }
    this.store.dispatch(addTodo({
      text: this.todoInput,
      active: this.active,
      completed: this.completed
    }))
    this.todoInput = '';
  }

  updateTodo(todo: Todo){
    this.store.dispatch(updateTodo({
      id: todo.id,
      active: !todo.active,
      completed: !todo.completed
    }))
  }

  clearCompleted(){
    this.store.dispatch(clearCompleted())
  }

  //RadioGradientToggler
  toggleRadio(i: number ) {
    this.radioVisibility[i] = !this.radioVisibility[i];
  }

  //drag-drop feature
  drop(event: CdkDragDrop<Todo[], Todo[],any>) {
    const reorderedTodos = [...this.todos];
    moveItemInArray(reorderedTodos, event.previousIndex, event.currentIndex);
    this.store.dispatch(reorderTodo({ todos: reorderedTodos }));
  }
}

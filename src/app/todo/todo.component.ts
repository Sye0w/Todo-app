import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { addTodo, clearCompleted, updateTodo } from '../store/todo/todo.actions'
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
  radioVisible: boolean = false;
  sortCheck: boolean = false;

  //TodoProps 
  active: boolean = true;
  completed: boolean = false;
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

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
        this.store.pipe(select(selectAllTodos)).subscribe((allTodos) => (this.todos = allTodos))
        break;
      case 'active':
        this.store.pipe(select(selectActiveTodos)).subscribe((activeTodos) => ( this.todos = activeTodos))
        break;
      case 'completed':
        this.store.pipe(select(selectCompletedTodos)).subscribe((completedTodos) => (this.todos = completedTodos))
        break;
    }
  }

  selectSort(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.sortTodos();
  }

  //store actions
  addTodo(){
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
  toggleRadio(){
    return this.radioVisible = !this.radioVisible
  }


}

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Todo } from '../../store/todo/todo.reducer';
import { AppState } from '../../store/index';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoService } from '../../services/todo.service';
import { ThemeService } from '../../services/theme.service'; // Import ThemeService

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [FormsModule, CdkDropList, NgFor, CdkDrag, NgIf],
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

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService,
    private themeService: ThemeService 
  ) {
    this.isDarkMode = false;
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe((theme) => (this.isDarkMode = theme)); // Subscribe via ThemeService
    this.sortTodos();
  }

  //filter todos feat
  sortTodos() {
    this.todoService.getTodos(this.filter).subscribe((filteredTodos) => {
      this.todos = filteredTodos;
      this.initializeRadioVisibility();
    });
  }

  initializeRadioVisibility() {
    this.radioVisibility = Array(this.todos.length).fill(false);
  }

  selectSort(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.sortTodos();
  }

  //store actions via service
  addTodo() {
    this.todoService.addTodo(this.todoInput, this.active, this.completed);
    this.todoInput = '';
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  //RadioGradientToggler
  toggleRadio(i: number) {
    this.radioVisibility[i] = !this.radioVisibility[i];
  }

  //drag-drop feature
  drop(event: CdkDragDrop<Todo[], Todo[], any>) {
    const reorderedTodos = [...this.todos];
    moveItemInArray(reorderedTodos, event.previousIndex, event.currentIndex);
    this.todoService.reorderTodo(reorderedTodos);
  }
}
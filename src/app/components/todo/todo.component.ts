import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Todo } from '../../store/todo/todo.reducer';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { HeaderService } from '../../services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [FormsModule, CdkDropList, NgFor, CdkDrag, NgIf]
})
  export class TodoComponent implements OnInit, OnDestroy {
  todoInput: string = '';
  isDarkMode: boolean = false;
  todos: Todo[] = [];
  radioVisibility: boolean[] = [];

  constructor(
    private todoService: TodoService,
    private headerService: HeaderService
  ) {}

  private subscriptions: Subscription[] = [];
  
  get filter(): 'all' | 'active' | 'completed' {
    return this.todoService.getCurrentFilter();
  }
  
  initializeRadioVisibility() {
    this.radioVisibility = Array(this.todos.length).fill(false);
  }
  

  ngOnInit() {
    // Subscribe to theme changes
    this.subscriptions.push(
      this.headerService.getTheme().subscribe(
        (theme) => this.isDarkMode = theme
      )
    );
    
    // Subscribe to filtered todos
    this.subscriptions.push(
      this.todoService.filteredTodos$.subscribe(todos => {
        this.todos = todos;
        this.initializeRadioVisibility();
      })
    );
  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectSort(filter: 'all' | 'active' | 'completed') {
    this.todoService.setFilter(filter);
  }

  addTodo() {
    const trimmedInput = this.todoInput.trim();
    if (!trimmedInput) {
      return;
    }
    this.todoService.addTodo(trimmedInput, true, false);
    this.todoInput = '';
  }

  updateTodo(todo: Todo) {
    this.todoService.toggleTodoStatus(todo);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  toggleRadio(i: number) {
    this.radioVisibility[i] = !this.radioVisibility[i];
  }

  drop(event: CdkDragDrop<Todo[], Todo[], any>) {
    const reorderedTodos = [...this.todos];
    moveItemInArray(reorderedTodos, event.previousIndex, event.currentIndex);
    this.todoService.reorderTodos(reorderedTodos);
  }
}
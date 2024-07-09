import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoItemInputComponent } from './components/todo-item-input/todo-item-input.component';
import { TodoItemListComponent } from './components/todo-item-list/todo-item-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, TodoItemInputComponent, TodoItemListComponent]
})
export class AppComponent {}

// Refactored into multiple components. 
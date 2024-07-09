import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataService, TodoItem } from '../../services/data.service';

@Component({
  selector: 'app-todo-item-input',
  templateUrl: './todo-item-input.component.html',
  styleUrls: ['./todo-item-input.component.css'],
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TodoItemInputComponent {

  // Use inject rather than DI through constructor for future proofing considerations
  public formBuilder = inject(FormBuilder);
  public dataService = inject(DataService);

  // Use modern signals with zoneless to get most efficient change detection
  public errorMessage = signal('');

  public todoItemForm = this.formBuilder.group({
    description: [''],
  });

  public async handleAdd() {
    const response = await this.dataService.addTodoItem(this.todoItemForm.value as TodoItem);
    if(response.ok){
      this.handleClear();
    }else{
      this.errorMessage.set(await response.text());
    }
  }

  handleClear() {
    this.errorMessage.set('');
    this.todoItemForm.reset();
  }
}


// We could have built a service for managing the list of items client side too
// Add new item and sort upon handleAdd()
// Treating that extension as beyond scope for time given to this exercise
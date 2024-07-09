import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService, TodoItem } from '../../services/data.service';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css'],
  standalone: true,
  imports: [ CommonModule]
})
export class TodoItemListComponent {

  public items = signal<TodoItem[]>([]);

  public dataService = inject(DataService);

  public errorMessage = signal('');

  public async getItems() {
    const response = await this.dataService.getTodoItems();
    if(response.ok){
      this.items.set(await response.json());
    }else{
      this.errorMessage.set(await response.text());
    }
  }

  public async handleMarkAsComplete(item: TodoItem) {
    item.isCompleted = true;
    const response = await this.dataService.updateTodoItem(item);
    if(response.ok){
      this.getItems();
    }else{
      this.errorMessage.set(await response.text());
    }
  }
}

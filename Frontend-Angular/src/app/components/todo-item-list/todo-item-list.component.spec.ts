import { TestBed } from '@angular/core/testing';

import { TodoItemListComponent } from "./todo-item-list.component";

describe('TodoItemInputComponent', () => {

  it('should component initialized', () => {
    const  component = TestBed.runInInjectionContext(() => new TodoItemListComponent());
    expect(component).toBeTruthy();
  });


});


// see todo-item-input.component.spec.ts for an example of writing a test
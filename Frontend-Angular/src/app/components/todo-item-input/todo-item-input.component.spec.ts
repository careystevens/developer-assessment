import { TestBed } from '@angular/core/testing';

import { DataService } from "../../services/data.service";

import { TodoItemInputComponent } from "./todo-item-input.component";

describe('TodoItemInputComponent', () => {

  // Mock the DataService
  const dataServiceMock: jasmine.SpyObj<DataService> = jasmine.createSpyObj('DataService', ['addTodoItem']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
          provide: DataService,
          useValue: dataServiceMock
        }]
  }));

  it('should component initialized', () => {
    const  component = TestBed.runInInjectionContext(() => new TodoItemInputComponent());
    expect(component).toBeTruthy();
  });

  it('should call addTodoItem when handleAdd called', () => {    
    const  component = TestBed.runInInjectionContext(() => new TodoItemInputComponent());
    component.handleAdd();
    expect(dataServiceMock.addTodoItem).toHaveBeenCalled();
  });


  it('should clear description when handleClear called', () => {
    const  component = TestBed.runInInjectionContext(() => new TodoItemInputComponent());
    component.todoItemForm.controls.description.setValue("A todo description");
    component.handleClear();
    expect(component.todoItemForm.controls.description.value).toBe(null);
  });


});

// We could write a more rich set of tests including; 
// more complete mocks 
// looking at the DOM

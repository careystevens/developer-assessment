import { Injectable } from '@angular/core';

import { TodoItem } from './TodoItem';

export { TodoItem }

@Injectable({
  providedIn: 'root',
})
export class DataService {

    // Could set up environments eg prod url
    //private _apiUrl = 'https://localhost:50001/api/todoitems';

    private _apiUrl = 'https://localhost:44397/api/todoitems';

    private _headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    };

    public async addTodoItem(todoItem: TodoItem){
        return fetch(this._apiUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(todoItem),
        });
    }

    public async getTodoItems(){
        return fetch(this._apiUrl, {
            method: "GET",
            headers: this._headers
        });
    }

    public async updateTodoItem(todoItem: TodoItem){
        return fetch(this._apiUrl + `/${todoItem.id}`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify(todoItem)
        });
    }
}

// Much discussion could be had here over the merit of using fetch rather than angular's  HttpClient
// Choosing fetch for more transparency and less magic
// There isnt really a need for rxjs observable pattern here and we aspire to a simple maintainable, transparent and portable code
// towards a future based on angular's Signals and Effects rather than rxjs unless necessary